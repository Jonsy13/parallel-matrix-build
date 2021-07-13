import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { InputField } from 'litmus-ui';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import YAML from 'yaml';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import * as WorkflowActions from '../../../../redux/actions/workflow';
import {
  WorkflowData,
  WorkflowManifest,
} from '../../../../models/redux/workflow';
import { RootState } from '../../../../redux/reducers';
import useActions from '../../../../redux/actions';
import {
  GVRRequest,
  KubeObjData,
  KubeObjRequest,
  KubeObjResource,
  KubeObjResponse,
} from '../../../../models/graphql/createWorkflowData';
import { KUBE_OBJ } from '../../../../graphql';
import { constants } from '../../../../constants';
import { gvrData } from './data';

interface AppInfoData {
  namespace: string;
  appLabel: string[];
}

interface TargetApplicationData {
  appns: string | undefined;
  appkind: string;
  applabel: string;
  annotationCheck: boolean;
  jobCleanUpPolicy: string;
}

interface TargetApplicationProp {
  gotoStep: (page: number) => void;
}

const TargetApplication: React.FC<TargetApplicationProp> = ({ gotoStep }) => {
  const { t } = useTranslation();
  /**
   * State Variables to manage theme changes
   */
  const classes = useStyles();
  const theme = useTheme();

  /**
   * State variable for redux
   */
  const workflow = useActions(WorkflowActions);
  const manifest: WorkflowManifest = useSelector(
    (state: RootState) => state.workflowManifest
  );
  const workflowData: WorkflowData = useSelector(
    (state: RootState) => state.workflowData
  );
  const { clusterid } = workflowData;
  const engineManifest = YAML.parse(manifest.engineYAML);

  /**
   * State variable for editing the ChaosEngine Configuration
   */
  const [targetApp, setTargetApp] = useState<TargetApplicationData>({
    appns: engineManifest.spec.appinfo?.appns ?? '',
    applabel: engineManifest.spec.appinfo?.applabel ?? '',
    appkind: engineManifest.spec.appinfo?.appkind ?? '',
    annotationCheck:
      typeof engineManifest.spec.annotationCheck === 'boolean'
        ? engineManifest.spec.annotationCheck
        : engineManifest.spec.annotationCheck === 'true',
    jobCleanUpPolicy: engineManifest.spec.jobCleanUpPolicy ?? 'retain',
  });
  const [addNodeSelector, setAddNodeSelector] = useState<boolean>(
    !!engineManifest.spec.experiments[0].spec.components['nodeSelectors']
  );
  const [nodeSelector, setNodeSelector] = useState(
    engineManifest.spec.experiments[0].spec.components.nodeSelectors
      ? engineManifest.spec.experiments[0].spec.components.nodeSelectors[
          'kubernetes.io/hostname'
        ]
      : ''
  );
  const [appinfoData, setAppInfoData] = useState<AppInfoData[]>([]);
  const [GVRObj, setGVRObj] = useState<GVRRequest>({
    group: '',
    version: '',
    resource: '',
  });
  const [appLabel, setAppLabel] = useState<string[]>([]);

  /**
   * Function for handling AnnotationCheck toggle button
   */
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean
  ) => {
    if (newAlignment !== null) {
      setTargetApp({ ...targetApp, annotationCheck: newAlignment });
      engineManifest.spec.annotationCheck = newAlignment.toString();
    }
  };

  /**
   * handleMainYAMLChange handles the change in configuration
   * of the Chaos Engine accroding to the index of the main manifest
   */
  const handleMainYAMLChange = () => {
    engineManifest.spec.annotationCheck = targetApp.annotationCheck.toString();
    if (engineManifest.spec.appinfo !== undefined) {
      engineManifest.spec.appinfo.appns = targetApp.appns;
      engineManifest.spec.appinfo.applabel = targetApp.applabel;
      engineManifest.spec.appinfo.appkind = targetApp.appkind;
    }
    if (typeof engineManifest.metadata.namespace === 'object') {
      // Removes any whitespace in '{{workflow.parameters.adminModeNamespace}}'
      const namespace = Object.keys(
        engineManifest.metadata.namespace
      )[0].replace(/\s/g, '');
      engineManifest.metadata.namespace = `{${namespace}}`;
    }
    /**
     * If addNodeSelector is true, the value of nodeselector is added
     * else if the addNodeSelector is false and it exists, the value is removed
     */
    if (addNodeSelector) {
      engineManifest.spec.experiments[0].spec.components['nodeSelectors'] = {
        'kubernetes.io/hostname': nodeSelector,
      };
    } else if (
      !addNodeSelector &&
      engineManifest.spec.experiments[0].spec.components['nodeSelectors']
    ) {
      delete engineManifest.spec.experiments[0].spec.components[
        'nodeSelectors'
      ];
    }
    engineManifest.spec.jobCleanUpPolicy = targetApp.jobCleanUpPolicy;

    workflow.setWorkflowManifest({
      engineYAML: YAML.stringify(engineManifest),
    });
    return gotoStep(2);
  };

  /**
   * GraphQL subscription to fetch the KubeObjData from the server
   */
  const { data } = useSubscription<KubeObjResponse, KubeObjRequest>(KUBE_OBJ, {
    variables: {
      data: {
        cluster_id: clusterid,
        object_type: 'kubeobject',
        kube_obj_request: {
          group: GVRObj.group,
          version: GVRObj.version,
          resource: GVRObj.resource,
        },
      },
    },
    fetchPolicy: 'network-only',
  });

  /**
   * UseEffect to filter the labels according to the namespace provided
   */
  useEffect(() => {
    if (data !== undefined) {
      const appinfo: AppInfoData[] = [];
      try {
        /**
         * Parse the kubeObject data
         */
        const kubeData: KubeObjData[] = JSON.parse(data.getKubeObject.kube_obj);
        kubeData.forEach((obj: KubeObjData) => {
          const applabels: string[] = [];
          if (obj.data != null) {
            obj.data.forEach((objData: KubeObjResource) => {
              if (objData.labels != null) {
                /**
                 * Get the labels from the key value pairs
                 * example - app=mongo
                 */
                Object.entries(objData.labels).map(([key, value]) =>
                  applabels.push(`${key}=${value}`)
                );
              }
            });
          }
          /**
           * Push these labels corresponding to their namespaces
           */
          appinfo.push({
            namespace: obj.namespace,
            appLabel: applabels,
          });
        });
      } catch (err) {
        console.error(err);
        appinfo.push({
          namespace: '',
          appLabel: [''],
        });
      }
      setAppInfoData(appinfo);

      /**
       * Filter the labels according to their namespace
       */
      if (appinfoData !== undefined) {
        const filteredAppLabel: string[] = [];
        appinfo.forEach((appinfos) => {
          if (appinfos.namespace === targetApp.appns) {
            appinfos.appLabel.forEach((label) => filteredAppLabel.push(label));
          }
        });
        if (filteredAppLabel.length > 0) {
          setAppLabel(filteredAppLabel);
        } else {
          setAppLabel(['No resource available']);
        }
      }
    }
  }, [data, targetApp.appns]);
  /**
   * This useEffect is called on the first render to fetch the
   * kubeObj data and populate it in the AutoComplete textfields
   */
  useEffect(() => {
    gvrData.forEach((gvr) => {
      if (gvr.resource === targetApp.appkind)
        setGVRObj({
          group: gvr.group,
          version: gvr.version,
          resource: `${gvr.resource}s`,
        });
    });
  }, []);

  return (
    <div>
      <Typography className={classes.annotationInfo}>
        {t('createWorkflow.tuneWorkflow.verticalStepper.annotationInfo')}
      </Typography>
      <br />
      <div className={classes.inputDiv}>
        {/* Annotation Check  */}
        <div className={classes.flexDisplay}>
          <Typography className={classes.annotation}>
            {t('createWorkflow.tuneWorkflow.verticalStepper.annotation')}
          </Typography>
          <ToggleButtonGroup
            value={targetApp.annotationCheck}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              className={classes.annotationToggleBtn}
              style={{
                backgroundColor: targetApp.annotationCheck
                  ? theme.palette.success.main
                  : theme.palette.disabledBackground,
              }}
              value
              aria-label="left aligned"
            >
              <Typography
                style={{
                  color: targetApp.annotationCheck
                    ? theme.palette.common.white
                    : theme.palette.text.disabled,
                }}
                className={classes.text}
              >
                {t('createWorkflow.tuneWorkflow.verticalStepper.true')}
              </Typography>
            </ToggleButton>
            <ToggleButton
              style={{
                backgroundColor: !targetApp.annotationCheck
                  ? theme.palette.error.main
                  : theme.palette.disabledBackground,
              }}
              className={classes.annotationToggleBtn}
              value={false}
              aria-label="centered"
            >
              <Typography
                style={{
                  color: !targetApp.annotationCheck
                    ? theme.palette.common.white
                    : theme.palette.text.disabled,
                  textTransform: 'none',
                }}
                className={classes.text}
              >
                {t('createWorkflow.tuneWorkflow.verticalStepper.false')}
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <br />
        <Typography className={classes.annotationDesc}>
          {t('createWorkflow.tuneWorkflow.verticalStepper.annotationDesc')}
        </Typography>
        <br />
        <>
          {/* AutoComplete textfield for Namespace */}
          {engineManifest.spec.appinfo?.appns && (
            <>
              <Autocomplete
                id="combo-box-demo"
                options={appinfoData.map((option) => option.namespace)}
                freeSolo
                value={targetApp.appns}
                defaultValue={targetApp.appns}
                className={classes.autoCompleteText}
                onChange={(_, v: any) => {
                  setTargetApp({
                    ...targetApp,
                    appns: v,
                  });
                }}
                renderInput={(params) => (
                  <InputField
                    onChange={(event) => {
                      setTargetApp({
                        ...targetApp,
                        appns: event.target.value,
                      });
                    }}
                    {...params}
                    label={constants.appns}
                    helperText={
                      appinfoData.filter(
                        (data) => data.namespace === targetApp.appns
                      ).length === 0 ? (
                        <Typography color="error">
                          {t(
                            'createWorkflow.tuneWorkflow.verticalStepper.nsError'
                          )}
                        </Typography>
                      ) : (
                        ''
                      )
                    }
                  />
                )}
              />
              <br />
            </>
          )}

          {/* AppKind MenuList */}
          {engineManifest.spec.appinfo?.appkind && (
            <>
              <FormControl variant="outlined">
                <InputLabel id="appKind" className={classes.appKind}>
                  {t('createWorkflow.tuneWorkflow.verticalStepper.appkind')}
                </InputLabel>
                <Select
                  labelId="appKind"
                  value={targetApp.appkind}
                  onChange={(event) => {
                    setTargetApp({
                      ...targetApp,
                      appkind: event.target.value as string,
                    });
                    gvrData.forEach((gvr) => {
                      if (gvr.resource === (event.target.value as string)) {
                        setGVRObj({
                          group: gvr.group,
                          version: gvr.version,
                          resource: `${gvr.resource}s`,
                        });
                      }
                    });
                  }}
                  label={constants.appKind}
                >
                  <MenuItem aria-label="None" value="" />
                  {gvrData.map((gvr) => {
                    return (
                      <MenuItem key={gvr.resource} value={gvr.resource}>
                        {gvr.resource}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
            </>
          )}

          {/* AutoComplete textfield for applabel */}
          {engineManifest.spec.appinfo?.applabel && (
            <>
              <Autocomplete
                id="combo-box-demo"
                options={appLabel}
                freeSolo
                value={targetApp.applabel}
                defaultValue={targetApp.applabel}
                className={classes.autoCompleteText}
                onChange={(_, v: any) => {
                  setTargetApp({
                    ...targetApp,
                    applabel: v,
                  });
                }}
                renderInput={(params) => (
                  <InputField
                    onChange={(event) => {
                      setTargetApp({
                        ...targetApp,
                        applabel: event.target.value,
                      });
                    }}
                    helperText={
                      appLabel.filter((data) => data === targetApp.applabel)
                        .length === 0 ? (
                        <Typography color="error">
                          {t(
                            'createWorkflow.tuneWorkflow.verticalStepper.labelError'
                          )}
                        </Typography>
                      ) : (
                        ''
                      )
                    }
                    {...params}
                    label={constants.appLabel}
                  />
                )}
              />
              <br />
            </>
          )}

          {/* JobCleanUpPolicy textfield */}
          <InputField
            label={constants.jobCleanUp}
            width="auto"
            value={targetApp.jobCleanUpPolicy}
            onChange={(event) => {
              setTargetApp({
                ...targetApp,
                jobCleanUpPolicy: event.target.value,
              });
            }}
          />
          <br />

          {/* Checkbox for adding NodeSelector */}
          <FormControlLabel
            control={
              <Checkbox
                checked={addNodeSelector}
                onChange={(event) => {
                  return setAddNodeSelector(event.target.checked);
                }}
                className={classes.checkBoxDefault}
                name="checkedB"
                color="primary"
              />
            }
            label={
              <Typography className={classes.checkBoxText}>
                {t('createWorkflow.tuneWorkflow.verticalStepper.nodeselector')}
              </Typography>
            }
          />
          {addNodeSelector && (
            <div className={classes.flexDisplay}>
              <Typography className={classes.nodeSelectorText}>
                {t('createWorkflow.tuneWorkflow.verticalStepper.selector')}
              </Typography>
              <InputField
                label={constants.nodeselector}
                width="50%"
                value={nodeSelector}
                onChange={(event) => {
                  setNodeSelector(event.target.value);
                }}
              />
            </div>
          )}
        </>
      </div>
      <br />

      <div>
        <Button onClick={() => gotoStep(0)} className={classes.button}>
          {t('workflowStepper.back')}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleMainYAMLChange()}
          className={classes.button}
        >
          {t('workflowStepper.next')}
        </Button>
      </div>
    </div>
  );
};

export default TargetApplication;
