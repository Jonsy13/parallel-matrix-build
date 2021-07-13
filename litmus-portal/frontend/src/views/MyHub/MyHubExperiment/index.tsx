import { useQuery } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import DeveloperGuide from '../../../components/DeveloperGuide';
import ExperimentHeader from '../ExperimentHeader';
import ExperimentInfo from '../../../components/ExperimentInfo';
import InstallChaos from '../../../components/InstallChaos';
import Loader from '../../../components/Loader';
import UsefulLinks from '../../../components/UsefulLinks';
import config from '../../../config';
import Scaffold from '../../../containers/layouts/Scaffold';
import { GET_EXPERIMENT_DATA, GET_HUB_STATUS } from '../../../graphql';
import { ExperimentDetail, HubStatus, Link } from '../../../models/redux/myhub';
import { getProjectID } from '../../../utils/getSearchParams';
import useStyles from './styles';

interface URLParams {
  chart: string;
  experiment: string;
  hubname: string;
}

const MyHub = () => {
  const classes = useStyles();
  // Get Parameters from URL
  const paramData: URLParams = useParams();
  const projectID = getProjectID();
  // Get all MyHubs with status
  const { data: hubDetails } = useQuery<HubStatus>(GET_HUB_STATUS, {
    variables: { data: projectID },
    fetchPolicy: 'cache-and-network',
  });

  // Filter the selected MyHub
  const UserHub = hubDetails?.getHubStatus.filter((myHub) => {
    return paramData.hubname === myHub.HubName;
  })[0];

  // Query to get charts of selected MyHub
  const { data, loading } = useQuery<ExperimentDetail>(GET_EXPERIMENT_DATA, {
    variables: {
      data: {
        HubName: paramData.hubname,
        ProjectID: projectID,
        ChartName: paramData.chart,
        ExperimentName: paramData.experiment,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const experimentData = data?.getHubExperiment;

  // State for default video URL
  let videoURL: string = '';
  const video = data?.getHubExperiment.Spec.Links.filter(
    (l: Link) => l.Name === 'Video'
  )[0];
  videoURL = video ? video.Url : '';

  // State for default icon URL
  const experimentDefaultImagePath = `${config.grahqlEndpoint}/icon`;
  const imageURL = `${experimentDefaultImagePath}/${projectID}/${paramData.hubname}/${paramData.chart}/${paramData.experiment}.png`;

  const { t } = useTranslation();

  return (
    <Scaffold>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.rootContainer}>
          <div className={classes.mainDiv}>
            <div className={classes.headerDiv}>
              {/* Exp title + Description */}
              <div className={classes.expMain}>
                <ExperimentHeader
                  title={experimentData?.Metadata.Name}
                  description={
                    experimentData?.Spec.CategoryDescription.split('.')[0]
                  }
                  urlToIcon={imageURL}
                />
              </div>
            </div>
          </div>
          {/* Developer Guide Component */}
          {paramData.chart.toLowerCase() !== 'predefined' && (
            <div className={classes.developerDiv}>
              <DeveloperGuide
                expAvailable
                header={t('myhub.experimentPage.congrats')}
                description=""
              />
            </div>
          )}
          {/* Experiment Info */}
          <div className={classes.detailDiv}>
            <div className={classes.expInfo}>
              <div className={classes.expInfoDiv}>
                <ExperimentInfo
                  description={experimentData?.Spec.CategoryDescription}
                  videoURL={videoURL}
                />
                <div className={classes.installExp}>
                  <hr className={classes.horizontalLine} />
                  <div>
                    <div className={classes.note}>PRE-REQUISITE:</div>
                    <div className={classes.linkText}>
                      <a
                        href="https://docs.litmuschaos.io/docs/getstarted/"
                        target="_"
                      >
                        Install Litmus Operator
                      </a>
                      : a tool for injecting Chaos Experiments
                    </div>
                  </div>
                  <hr className={classes.horizontalLine} />
                </div>
              </div>
              {/* Useful Links Section */}
              <div className={classes.info}>
                <UsefulLinks
                  links={experimentData?.Spec.Links}
                  maintainers={experimentData?.Spec.Maintainers}
                  platforms={experimentData?.Spec.Platforms}
                  maturity={experimentData?.Spec.Maturity}
                />
              </div>
            </div>
            {/* Install Chaos Section */}
            {paramData.chart.toLowerCase() !== 'predefined' ? (
              <div className={classes.installLinks}>
                <InstallChaos
                  title={t('myhub.experimentPage.installExp')}
                  description={t('myhub.experimentPage.installExpDesc')}
                  yamlLink={`${UserHub?.RepoURL}/raw/${UserHub?.RepoBranch}/charts/${paramData.chart}/${paramData.experiment}/experiment.yaml`}
                />
                <InstallChaos
                  title={t('myhub.experimentPage.installRBAC')}
                  description={t('myhub.experimentPage.installRBACDesc')}
                  yamlLink={`${UserHub?.RepoURL}/raw/${UserHub?.RepoBranch}/charts/${paramData.chart}/${paramData.experiment}/rbac.yaml`}
                />
                <InstallChaos
                  title={t('myhub.experimentPage.installEngine')}
                  description={t('myhub.experimentPage.installEngineDesc')}
                  yamlLink={`${UserHub?.RepoURL}/raw/${UserHub?.RepoBranch}/charts/${paramData.chart}/${paramData.experiment}/engine.yaml`}
                />
              </div>
            ) : (
              <>
                <InstallChaos
                  title={t('myhub.experimentPage.checkPreDefined')}
                  description={t('myhub.experimentPage.checkPreDefinedDesc')}
                  yamlLink={`${UserHub?.RepoURL}/raw/${UserHub?.RepoBranch}/workflows/${paramData.experiment}`}
                  isPredefined
                />
              </>
            )}
          </div>
        </div>
      )}
    </Scaffold>
  );
};

export default MyHub;
