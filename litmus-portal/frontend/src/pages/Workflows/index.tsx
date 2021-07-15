import { AppBar, Typography } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import Tabs from '@material-ui/core/Tabs';
import { ButtonFilled } from 'litmus-ui';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SuspenseLoader } from '../../components/SuspenseLoader';
import { StyledTab, TabPanel } from '../../components/Tabs';
import Wrapper from '../../containers/layouts/Wrapper';
import useActions from '../../redux/actions';
import * as TabActions from '../../redux/actions/tabs';
import * as TemplateSelectionActions from '../../redux/actions/template';
import * as WorkflowActions from '../../redux/actions/workflow';
import { history } from '../../redux/configureStore';
import { RootState } from '../../redux/reducers';
import { getProjectID, getProjectRole } from '../../utils/getSearchParams';
import useStyles from './styles';

const BrowseSchedule = lazy(
  () => import('../../views/ChaosWorkflows/BrowseSchedule')
);
const BrowseWorkflow = lazy(() => import('../../views/ChaosWorkflows/Runs'));

const Workflows = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const projectID = getProjectID();
  const userRole = getProjectRole();
  const workflowAction = useActions(WorkflowActions);
  const template = useActions(TemplateSelectionActions);
  const workflowTabValue = useSelector(
    (state: RootState) => state.tabNumber.workflows
  );
  const tabs = useActions(TabActions);

  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    tabs.changeWorkflowsTabs(newValue);
  };

  const handleScheduleWorkflow = () => {
    workflowAction.setWorkflowDetails({
      isCustomWorkflow: false,
      customWorkflows: [],
    });
    template.selectTemplate({ selectedTemplateID: 0, isDisable: true });
    history.push({
      pathname: '/create-workflow',
      search: `?projectID=${projectID}&projectRole=${userRole}`,
    });
  };

  return (
    <Wrapper>
      <section>
        <div className={classes.header}>
          <Typography variant="h3">Chaos Workflows</Typography>
          <div className={classes.scheduleBtn}>
            <ButtonFilled onClick={handleScheduleWorkflow}>
              {t('workflows.scheduleAWorkflow')}
            </ButtonFilled>
          </div>
        </div>
      </section>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={workflowTabValue}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.highlight,
            },
          }}
          variant="fullWidth"
        >
          <StyledTab label={`${t('workflows.runs')}`} data-cy="runs" />
          <StyledTab
            label={`${t('workflows.schedules')}`}
            data-cy="browseSchedule"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={workflowTabValue} index={0}>
        <SuspenseLoader style={{ height: '50vh' }}>
          <BrowseWorkflow />
        </SuspenseLoader>
      </TabPanel>
      <TabPanel value={workflowTabValue} index={1}>
        <SuspenseLoader style={{ height: '50vh' }}>
          <BrowseSchedule />
        </SuspenseLoader>
      </TabPanel>
    </Wrapper>
  );
};

export default Workflows;
