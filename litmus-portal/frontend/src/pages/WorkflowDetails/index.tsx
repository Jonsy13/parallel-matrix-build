import { useQuery } from '@apollo/client';
import { AppBar, Typography, useTheme } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs/Tabs';
import React, { lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/Button/BackButton';
import Loader from '../../components/Loader';
import { SuspenseLoader } from '../../components/SuspenseLoader';
import { StyledTab, TabPanel } from '../../components/Tabs';
import Wrapper from '../../containers/layouts/Wrapper';
import {
  WORKFLOW_DETAILS_WITH_EXEC_DATA,
  WORKFLOW_EVENTS_WITH_EXEC_DATA,
  WORKFLOW_LIST_DETAILS,
} from '../../graphql';
import { ScheduleWorkflow } from '../../models/graphql/scheduleData';
import {
  ExecutionData,
  Workflow,
  WorkflowDataVars,
  WorkflowSubscription,
  WorkflowSubscriptionInput,
} from '../../models/graphql/workflowData';
import {
  ListWorkflowsInput,
  ScheduledWorkflows,
} from '../../models/graphql/workflowListData';
import useActions from '../../redux/actions';
import * as NodeSelectionActions from '../../redux/actions/nodeSelection';
import * as TabActions from '../../redux/actions/tabs';
import { RootState } from '../../redux/reducers';
import { getProjectID } from '../../utils/getSearchParams';
import ArgoWorkflow from '../../views/WorkflowDetails/ArgoWorkflow';
import WorkflowInfo from '../../views/WorkflowDetails/WorkflowInfo';
import WorkflowNodeInfo from '../../views/WorkflowDetails/WorkflowNodeInfo';
import useStyles from './styles';

const NodeLogsModal = lazy(
  () => import('../../views/WorkflowDetails/LogsModal')
);

const NodeTable = lazy(
  () => import('../../views/WorkflowDetails/WorkflowTable')
);

interface URLParams {
  workflowRunId: string;
}

const WorkflowDetails: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const classes = useStyles();
  const [logsModalOpen, setLogsModalOpen] = useState<boolean>(false);
  const [isInfoToggled, setIsInfoToggled] = useState<boolean>(false);
  // State for Checking if workflow failed
  const [isWorkflowFailed, setWorkflowFailed] = useState<boolean>(false);
  const [workflowSchedulesDetails, setworkflowSchedulesDetails] =
    useState<ScheduleWorkflow>();

  const tabs = useActions(TabActions);
  const nodeSelection = useActions(NodeSelectionActions);

  // get ProjectID
  const projectID = getProjectID();

  const workflowDetailsTabValue = useSelector(
    (state: RootState) => state.tabNumber.node
  );

  const { pod_name } = useSelector((state: RootState) => state.selectedNode);

  const { workflowRunId }: URLParams = useParams();

  // Query to get workflows
  const { subscribeToMore, data, error } = useQuery<Workflow, WorkflowDataVars>(
    WORKFLOW_DETAILS_WITH_EXEC_DATA,
    {
      variables: {
        workflowRunsInput: {
          project_id: projectID,
          workflow_run_ids: [workflowRunId],
        },
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  const workflowRun = data?.getWorkflowRuns.workflow_runs[0];

  const { data: workflowData, loading } = useQuery<
    ScheduledWorkflows,
    ListWorkflowsInput
  >(WORKFLOW_LIST_DETAILS, {
    variables: {
      workflowInput: {
        project_id: projectID,
        workflow_ids: [workflowRun?.workflow_id ?? ' '],
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  // Using subscription to get realtime data
  useEffect(() => {
    if (workflowRun?.phase && workflowRun.phase === 'Running') {
      subscribeToMore<WorkflowSubscription, WorkflowSubscriptionInput>({
        document: WORKFLOW_EVENTS_WITH_EXEC_DATA,
        variables: { projectID },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data || !prev || !prev.getWorkflowRuns)
            return prev;

          const modifiedWorkflows = prev.getWorkflowRuns.workflow_runs.slice();
          const newWorkflow = subscriptionData.data.workflowEventListener;

          // Update only the required workflowRun
          if (
            modifiedWorkflows[0].workflow_run_id === newWorkflow.workflow_run_id
          )
            modifiedWorkflows[0] = newWorkflow;

          const totalNoOfWorkflows =
            prev.getWorkflowRuns.total_no_of_workflow_runs;

          return {
            getWorkflowRuns: {
              total_no_of_workflow_runs: totalNoOfWorkflows,
              workflow_runs: modifiedWorkflows,
            },
          };
        },
      });
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    tabs.changeWorkflowDetailsTabs(newValue);
  };

  useEffect(() => {
    const scheduledWorkflow = workflowData?.ListWorkflow.workflows;
    if (scheduledWorkflow) {
      setworkflowSchedulesDetails(
        (scheduledWorkflow[0] ? scheduledWorkflow[0] : null) as ScheduleWorkflow
      );
    }
  }, [workflowData]);

  // On fresh screen refresh 'Workflow' Tab would be selected
  useEffect(() => {
    tabs.changeWorkflowDetailsTabs(0);
  }, []);

  // Setting NodeId of first Node in redux for selection of first node in Argo graph by default
  useEffect(() => {
    if (workflowRun && pod_name === '') {
      if (
        Object.keys(JSON.parse(workflowRun.execution_data as string).nodes)
          .length
      ) {
        const firstNodeId = JSON.parse(workflowRun.execution_data as string)
          .nodes[
          Object.keys(JSON.parse(workflowRun.execution_data as string).nodes)[0]
        ].name;
        nodeSelection.selectNode({
          ...JSON.parse(workflowRun.execution_data as string).nodes[
            firstNodeId
          ],
          pod_name: firstNodeId,
        });
      } else {
        setWorkflowFailed(true);
      }
    }
  }, [data]);

  return (
    <Wrapper>
      <div className={classes.root}>
        <div className={classes.button}>
          <BackButton />
        </div>
        {/* If workflowRun data is present then display the workflowRun details */}
        {workflowRun && pod_name !== '' && !loading ? (
          <div>
            <Typography data-cy="wfName" className={classes.title}>
              {t('workflowDetailsView.headerDesc')} {workflowRun.workflow_name}
            </Typography>

            {/* AppBar */}
            <AppBar
              position="static"
              color="default"
              className={classes.appBar}
            >
              <Tabs
                value={workflowDetailsTabValue || 0}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: theme.palette.highlight,
                  },
                }}
                variant="fullWidth"
              >
                <StyledTab label="Graph View" />
                <StyledTab label="Table View" />
              </Tabs>
            </AppBar>
            <TabPanel value={workflowDetailsTabValue} index={0}>
              <div
                className={classes.graphView}
                data-cy="dagreGraphWorkflowLevel"
              >
                {/* Argo Workflow DAG Graph */}
                <ArgoWorkflow
                  nodes={
                    (JSON.parse(workflowRun.execution_data) as ExecutionData)
                      .nodes
                  }
                  setIsInfoToggled={setIsInfoToggled}
                />
                <SuspenseLoader style={{ height: '50vh' }}>
                  {/* Workflow Details and Experiment Logs */}
                  {isInfoToggled ? (
                    <div>
                      {pod_name !==
                      JSON.parse(workflowRun.execution_data).nodes[
                        Object.keys(
                          JSON.parse(workflowRun.execution_data as string).nodes
                        )[0]
                      ].name ? (
                        /* Node details and Logs */
                        <WorkflowNodeInfo
                          manifest={
                            workflowSchedulesDetails?.workflow_manifest as string
                          }
                          setIsInfoToggled={setIsInfoToggled}
                          cluster_id={workflowRun.cluster_id}
                          workflow_run_id={workflowRun.workflow_run_id}
                          data={
                            JSON.parse(
                              workflowRun.execution_data
                            ) as ExecutionData
                          }
                        />
                      ) : (
                        /* Workflow Details */
                        <WorkflowInfo
                          tab={1}
                          setIsInfoToggled={setIsInfoToggled}
                          cluster_name={workflowRun.cluster_name}
                          data={
                            JSON.parse(
                              workflowRun.execution_data
                            ) as ExecutionData
                          }
                          resiliency_score={workflowRun.resiliency_score}
                        />
                      )}
                    </div>
                  ) : null}
                </SuspenseLoader>
              </div>
            </TabPanel>
            <TabPanel value={workflowDetailsTabValue} index={1}>
              <SuspenseLoader style={{ height: '50vh' }}>
                {/* Workflow Info */}
                <WorkflowInfo
                  tab={2}
                  cluster_name={workflowRun.cluster_name}
                  data={JSON.parse(workflowRun.execution_data) as ExecutionData}
                  resiliency_score={workflowRun.resiliency_score}
                />
                {/* Table for all Node details */}
                <NodeTable
                  manifest={
                    workflowSchedulesDetails?.workflow_manifest as string
                  }
                  data={JSON.parse(workflowRun.execution_data) as ExecutionData}
                  handleClose={() => setLogsModalOpen(true)}
                />
                {/* Modal for viewing logs of a node */}
                <NodeLogsModal
                  logsOpen={logsModalOpen}
                  handleClose={() => setLogsModalOpen(false)}
                  cluster_id={workflowRun.cluster_id}
                  workflow_run_id={workflowRun.workflow_run_id}
                  data={JSON.parse(workflowRun.execution_data) as ExecutionData}
                  workflow_name={workflowRun.workflow_name}
                />
              </SuspenseLoader>
            </TabPanel>
          </div>
        ) : error ? (
          <Typography>{t('workflowDetails.fetchError')}</Typography>
        ) : isWorkflowFailed ? (
          <Typography>{t('workflowDetails.workflowNotStarted')}</Typography>
        ) : (
          <Loader />
        )}
      </div>
    </Wrapper>
  );
};

export default WorkflowDetails;
