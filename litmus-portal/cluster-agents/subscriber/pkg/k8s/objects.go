package k8s

import (
	"encoding/json"
	"errors"
	"os"
	"strings"

	"github.com/litmuschaos/litmus/litmus-portal/cluster-agents/subscriber/pkg/graphql"
	"github.com/sirupsen/logrus"

	"github.com/litmuschaos/litmus/litmus-portal/cluster-agents/subscriber/pkg/types"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
)

var (
	AgentNamespace = os.Getenv("AGENT_NAMESPACE")
	AgentScope     = os.Getenv("AGENT_SCOPE")
)

//GetKubernetesObjects is used to get the Kubernetes Object details according to the request type
func GetKubernetesObjects(request types.KubeObjRequest) ([]*types.KubeObject, error) {
	conf, err := GetKubeConfig()
	if err != nil {
		return nil, err
	}
	clientset, err := kubernetes.NewForConfig(conf)
	if err != nil {
		return nil, err
	}

	resourceType := schema.GroupVersionResource{
		Group:    request.KubeGVRRequest.Group,
		Version:  request.KubeGVRRequest.Version,
		Resource: request.KubeGVRRequest.Resource,
	}
	_, dynamicClient, err := GetDynamicAndDiscoveryClient()
	if err != nil {
		return nil, err
	}
	var ObjData []*types.KubeObject

	if strings.ToLower(AgentScope) == "namespace" {
		dataList, err := GetObjectDataByNamespace(AgentNamespace, dynamicClient, resourceType)
		if err != nil {
			return nil, err
		}
		KubeObj := &types.KubeObject{
			Namespace: AgentNamespace,
			Data:      dataList,
		}
		ObjData = append(ObjData, KubeObj)
	} else {
		namespace, err := clientset.CoreV1().Namespaces().List(metav1.ListOptions{})
		if err != nil {
			return nil, err
		}

		if len(namespace.Items) > 0 {
			for _, namespace := range namespace.Items {
				podList, err := GetObjectDataByNamespace(namespace.GetName(), dynamicClient, resourceType)
				if err != nil {
					return nil, err
				}
				KubeObj := &types.KubeObject{
					Namespace: namespace.GetName(),
					Data:      podList,
				}
				ObjData = append(ObjData, KubeObj)
			}
		} else {
			return nil, errors.New("No namespace available")
		}

	}
	kubeData, _ := json.Marshal(ObjData)
	var kubeObjects []*types.KubeObject
	err = json.Unmarshal(kubeData, &kubeObjects)
	if err != nil {
		return nil, err
	}
	return kubeObjects, nil
}

//GetObjectDataByNamespace uses dynamic client to fetch Kubernetes Objects data.
func GetObjectDataByNamespace(namespace string, dynamicClient dynamic.Interface, resourceType schema.GroupVersionResource) ([]types.ObjectData, error) {
	list, err := dynamicClient.Resource(resourceType).Namespace(namespace).List(metav1.ListOptions{})
	var kubeObjects []types.ObjectData
	if err != nil {
		return kubeObjects, nil
	}
	for _, list := range list.Items {
		listInfo := types.ObjectData{
			Name:                    list.GetName(),
			UID:                     list.GetUID(),
			Namespace:               list.GetNamespace(),
			APIVersion:              list.GetAPIVersion(),
			CreationTimestamp:       list.GetCreationTimestamp(),
			TerminationGracePeriods: list.GetDeletionGracePeriodSeconds(),
			Labels:                  list.GetLabels(),
		}
		kubeObjects = append(kubeObjects, listInfo)
	}
	return kubeObjects, nil
}

func GenerateKubeObject(cid string, accessKey string, kubeobjectrequest types.KubeObjRequest) ([]byte, error) {
	clusterID := `{cluster_id: \"` + cid + `\", access_key: \"` + accessKey + `\"}`
	kubeObj, err := GetKubernetesObjects(kubeobjectrequest)
	if err != nil {
		return nil, err
	}
	processed, err := graphql.MarshalGQLData(kubeObj)
	if err != nil {
		return nil, err
	}
	mutation := `{ cluster_id: ` + clusterID + `, request_id:\"` + kubeobjectrequest.RequestID + `\", kube_obj:\"` + processed[1:len(processed)-1] + `\"}`

	var payload = []byte(`{"query":"mutation { kubeObj(kubeData:` + mutation + ` )}"}`)
	return payload, nil
}

//SendKubeObjects generates graphql mutation to send kubernetes objects data to graphql server
func SendKubeObjects(clusterData map[string]string, kubeobjectrequest types.KubeObjRequest) error {
	// generate graphql payload
	payload, err := GenerateKubeObject(clusterData["CLUSTER_ID"], clusterData["ACCESS_KEY"], kubeobjectrequest)
	if err != nil {
		logrus.WithError(err).Print("Error while getting KubeObject Data")
		return err
	}

	body, err := graphql.SendRequest(clusterData["SERVER_ADDR"], payload)
	if err != nil {
		logrus.Print(err.Error())
		return err
	}

	logrus.Println("Response", body)
	return nil
}
