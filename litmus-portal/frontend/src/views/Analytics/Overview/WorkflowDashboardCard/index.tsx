import { IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { WorkflowRun } from '../../../../models/graphql/workflowData';
import useActions from '../../../../redux/actions';
import * as NodeSelectionActions from '../../../../redux/actions/nodeSelection';
import { history } from '../../../../redux/configureStore';
import { ReactComponent as AnalyticsIcon } from '../../../../svg/analytics.svg';
import { ReactComponent as WorkflowRunIcon } from '../../../../svg/workflowRun.svg';
import timeDifferenceForDate from '../../../../utils/datesModifier';
import {
  getProjectID,
  getProjectRole,
} from '../../../../utils/getSearchParams';
import {
  FAILED,
  NOTAVAILABLE,
  PENDING,
  RUNNING,
  SUCCEEDED,
} from '../../../WorkflowDetails/workflowConstants';
import useStyles from './styles';

interface WorkflowDashboardCardProps {
  data: WorkflowRun;
}

const WorkflowDashboardCard: React.FC<WorkflowDashboardCardProps> = ({
  data,
}) => {
  const classes = useStyles();
  const projectID = getProjectID();
  const projectRole = getProjectRole();
  const nodeSelection = useActions(NodeSelectionActions);

  function getStatusVariant(phase: string) {
    switch (phase) {
      case RUNNING:
        return 'status-running.svg';
      case SUCCEEDED:
        return 'status-success.svg';
      case FAILED:
        return 'status-failed.svg';
      case PENDING:
        return 'status-pending.svg';
      case NOTAVAILABLE:
        return 'status-NotAvailable.svg';
      default:
        return '';
    }
  }

  return (
    <>
      <div className={classes.animatedContainer}>
        <div className={classes.workflowDataContainer}>
          <div>
            <div className={classes.statusDiv}>
              <img
                src={`./icons/${getStatusVariant(data.phase)}`}
                alt="k8s"
                title={data.phase}
              />
              <div>
                <Typography
                  className={`${classes.testName} ${classes.noWrapProvider}`}
                >
                  {data.workflow_name}
                </Typography>
                <Typography className={classes.hint}>
                  Agent: {data.cluster_name}
                </Typography>
              </div>
            </div>
          </div>
          <Typography className={`${classes.noWrapProvider} ${classes.hint}`}>
            {timeDifferenceForDate(data.last_updated)}
          </Typography>
          <section className={classes.cardActionsSection}>
            <div className={classes.cardActions}>
              <IconButton
                onClick={() => {
                  nodeSelection.selectNode({
                    pod_name: '',
                  });
                  if (data.phase?.toLowerCase() !== 'notavailable')
                    history.push({
                      pathname: `/workflows/${data.workflow_run_id}`,
                      search: `?projectID=${projectID}&projectRole=${projectRole}`,
                    });
                }}
              >
                <WorkflowRunIcon />
              </IconButton>
              <Typography align="center">See workflow run</Typography>
            </div>
            <div className={classes.cardActions}>
              <IconButton
                onClick={() => {
                  history.push({
                    pathname: `/analytics/workflowdashboard/${data.workflow_id}`,
                    search: `?projectID=${projectID}&projectRole=${projectRole}`,
                  });
                }}
              >
                <AnalyticsIcon />
              </IconButton>
              <Typography align="center">See analytics</Typography>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export { WorkflowDashboardCard };
