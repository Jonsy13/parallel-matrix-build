package chaos_workflow

import chaosTypes "github.com/litmuschaos/chaos-operator/pkg/apis/litmuschaos/v1alpha1"

type WorkflowRunMetrics struct {
	ResiliencyScore    float64 `json:"resiliency_score"`
	ExperimentsPassed  int     `json:"experiments_passed"`
	ExperimentsFailed  int     `json:"experiments_failed"`
	ExperimentsAwaited int     `json:"experiments_awaited"`
	ExperimentsStopped int     `json:"experiments_stopped"`
	ExperimentsNA      int     `json:"experiments_na"`
	TotalExperiments   int     `json:"total_experiments"`
}

type ExecutionData struct {
	WorkflowType      string          `json:"workflow_type"`
	WorkflowID        string          `json:"-"`
	EventType         string          `json:"event_type"`
	UID               string          `json:"-"`
	Namespace         string          `json:"namespace"`
	Name              string          `json:"name"`
	CreationTimestamp string          `json:"creationTimestamp"`
	Phase             string          `json:"phase"`
	Message           string          `json:"message"`
	StartedAt         string          `json:"startedAt"`
	FinishedAt        string          `json:"finishedAt"`
	Nodes             map[string]Node `json:"nodes"`
}

// Node represents each node/step data
type Node struct {
	Name       string     `json:"name"`
	Phase      string     `json:"phase"`
	Message    string     `json:"message"`
	StartedAt  string     `json:"startedAt"`
	FinishedAt string     `json:"finishedAt"`
	Children   []string   `json:"children"`
	Type       string     `json:"type"`
	ChaosExp   *ChaosData `json:"chaosData,omitempty"`
}

// ChaosData is the data we get from chaos exporter
type ChaosData struct {
	EngineUID              string                  `json:"engineUID"`
	EngineContext          string                  `json:"engine_context"`
	EngineName             string                  `json:"engineName"`
	Namespace              string                  `json:"namespace"`
	ExperimentName         string                  `json:"experimentName"`
	ExperimentStatus       string                  `json:"experimentStatus"`
	LastUpdatedAt          string                  `json:"lastUpdatedAt"`
	ExperimentVerdict      string                  `json:"experimentVerdict"`
	ExperimentPod          string                  `json:"experimentPod"`
	RunnerPod              string                  `json:"runnerPod"`
	ProbeSuccessPercentage string                  `json:"probeSuccessPercentage"`
	FailStep               string                  `json:"failStep"`
	ChaosResult            *chaosTypes.ChaosResult `json:"chaosResult"`
}

type WorkflowSyncExternalData struct {
	WorkflowID    string `json:"workflow_id"`
	WorkflowRunID string `json:"workflow_run_id"`
}
