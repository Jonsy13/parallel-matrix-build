import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import localforage from 'localforage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_HUB_STATUS } from '../../../graphql/queries';
import { MyHubDetail } from '../../../models/graphql/user';
import { ChooseWorkflowRadio } from '../../../models/localforage/radioButton';
import { HubStatus } from '../../../models/redux/myhub';
import { getProjectID } from '../../../utils/getSearchParams';
import useStyles, { MenuProps } from './styles';

const SelectMyHub = () => {
  const { t } = useTranslation();
  const selectedProjectID = getProjectID();
  const [selectedHub, setSelectedHub] = useState('');
  const [availableHubs, setAvailableHubs] = useState<MyHubDetail[]>([]);

  // Get all MyHubs with status
  const { data } = useQuery<HubStatus>(GET_HUB_STATUS, {
    variables: { data: selectedProjectID },
    fetchPolicy: 'cache-and-network',
  });

  const handleMyHubChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setSelectedHub(event.target.value as string);
    const selection: ChooseWorkflowRadio = {
      selected: 'C',
    };
    localforage.setItem('selectedScheduleOption', selection);
    localforage.setItem('selectedHub', event.target.value as string);
    localforage.setItem('hasSetWorkflowData', false);
  };

  useEffect(() => {
    if (data?.getHubStatus !== undefined) {
      if (data.getHubStatus.length) {
        const hubDetails: MyHubDetail[] = [];
        data.getHubStatus.forEach((hub) => {
          /**
           * Push only available hubs
           */
          if (hub.IsAvailable) {
            hubDetails.push({
              id: hub.id,
              HubName: hub.HubName,
              RepoBranch: hub.RepoBranch,
              RepoURL: hub.RepoURL,
            });
          }
        });
        setAvailableHubs(hubDetails);
        data.getHubStatus.forEach((hubData) => {
          if (hubData.HubName.toLowerCase() === 'chaos hub') {
            setSelectedHub('Chaos Hub');
            localforage.setItem('selectedHub', 'Chaos Hub');
            localforage.setItem('hasSetWorkflowData', false);
          }
        });
      }
    }
  }, [data]);

  const classes = useStyles();
  return (
    <div>
      <div className={classes.inputDiv}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.label}>
            {t('createWorkflow.chooseWorkflow.selectMyHub')}
          </InputLabel>
          <Select
            data-cy="myHubDropDown"
            value={selectedHub}
            onChange={(e) => {
              handleMyHubChange(e);
            }}
            label="Cluster Status"
            MenuProps={MenuProps}
          >
            {availableHubs.map((hubs) => (
              <MenuItem
                key={hubs.HubName}
                data-cy="hubOption"
                value={hubs.HubName}
              >
                {hubs.HubName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectMyHub;
