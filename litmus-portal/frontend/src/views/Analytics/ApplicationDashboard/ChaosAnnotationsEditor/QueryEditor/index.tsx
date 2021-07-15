/* eslint-disable no-unused-expressions */
import { useQuery } from '@apollo/client';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { Autocomplete } from '@material-ui/lab';
import { AutocompleteChipInput, InputField } from 'litmus-ui';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '../../../../../components/Accordion';
import InfoTooltip from '../../../../../components/InfoTooltip';
import PrometheusQueryEditor from '../../../../../components/PrometheusQueryBox';
import { PROM_LABEL_VALUES } from '../../../../../graphql';
import {
  PromQueryDetails,
  QueryLabelValue,
} from '../../../../../models/dashboardsData';
import {
  LabelValue,
  PrometheusSeriesQueryVars,
  PrometheusSeriesResponse,
} from '../../../../../models/graphql/prometheus';
import { ReactComponent as ExpandAccordion } from '../../../../../svg/expandQueryAccordion.svg';
import { ReactComponent as ShrinkAccordion } from '../../../../../svg/shrinkQueryAccordion.svg';
import {
  getLabelsAndValues,
  setLabelsAndValues,
} from '../../../../../utils/promUtils';
import useStyles from './styles';

interface Option {
  name: string;
  [index: string]: any;
}

interface QueryEditorProps {
  index: number;
  promQuery: PromQueryDetails;
  dsURL: string;
  seriesList: Option[];
  handleUpdateQuery: (query: PromQueryDetails) => void;
}

const QueryEditor: React.FC<QueryEditorProps> = ({
  index,
  promQuery,
  dsURL,
  seriesList,
  handleUpdateQuery,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState<boolean>(index === 0);
  const [selectedValuesForLabel, setSelectedValuesForLabel] = React.useState<
    Array<Option>
  >([]);
  const [selectedLabel, setSelectedLabel] = React.useState<string>('');
  const [update, setUpdate] = React.useState<boolean>(false);
  const [localQuery, setLocalQuery] = React.useState<PromQueryDetails>({
    ...promQuery,
    base_query: promQuery.prom_query_name.split('{')[0].includes('(')
      ? promQuery.prom_query_name
          .split('{')[0]
          .substring(
            promQuery.prom_query_name.split('{')[0].lastIndexOf('(') + 1
          )
      : promQuery.prom_query_name.split('{')[0],
    labels_and_values_list: getLabelsAndValues(promQuery.prom_query_name),
  });

  const { data: labelValueData, refetch } = useQuery<
    PrometheusSeriesResponse,
    PrometheusSeriesQueryVars
  >(PROM_LABEL_VALUES, {
    variables: {
      prometheusInput: {
        ds_details: {
          url: dsURL,
          start: `${
            new Date(
              moment
                .unix(Math.round(new Date().getTime() / 1000) - 900)
                .format()
            ).getTime() / 1000
          }`,
          end: `${
            new Date(
              moment.unix(Math.round(new Date().getTime() / 1000)).format()
            ).getTime() / 1000
          }`,
        },
        series: localQuery.base_query ?? '',
      },
    },
    skip:
      dsURL === '' ||
      seriesList.length === 0 ||
      localQuery.base_query === '' ||
      !open,
    fetchPolicy: 'cache-and-network',
  });

  const getAvailableValues = (label: string) => {
    let options: Array<Option> = [];
    if (labelValueData) {
      labelValueData.GetPromLabelNamesAndValues.labelValues?.forEach(
        (labelValue) => {
          if (labelValue.label === label) {
            options = labelValue.values ?? [];
          }
        }
      );
    }
    return options;
  };

  const getSelectedValuesForLabel = (label: string) => {
    const labelValuesList: QueryLabelValue[] = getLabelsAndValues(
      localQuery.prom_query_name
    );
    const options: Array<Option> = [];
    labelValuesList.forEach((labelValue) => {
      if (labelValue.label === label) {
        labelValue.value.forEach((item) => {
          options.push({ name: item });
        });
      }
    });
    setSelectedValuesForLabel(options);
  };

  useEffect(() => {
    if (update) {
      handleUpdateQuery(localQuery);
      setUpdate(false);
    }
  }, [update]);

  const getValueList = (list: LabelValue[]) => {
    const completionOptions: any[] = [];
    list.forEach((labelValue) => {
      labelValue.values?.forEach((value) => {
        completionOptions.push({
          value,
          score: 3,
          meta: `Value for ${labelValue.label}`,
        });
      });
    });
    return completionOptions;
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={open}>
        <AccordionSummary
          onClick={() => setOpen(!open)}
          expandIcon={open ? <ShrinkAccordion /> : <ExpandAccordion />}
          IconButtonProps={{ edge: 'start' }}
          aria-controls={`query-${promQuery.queryid}-content`}
          id={`query-${promQuery.queryid}-header`}
          className={classes.query}
          key={`${promQuery.queryid}`}
        >
          <div className={classes.flex}>
            <Typography className={classes.queryTitle}>
              {promQuery.queryid}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.queryContainer}>
          <div style={{ width: '98.5%' }}>
            <Autocomplete
              value={{ name: localQuery.base_query ?? '' }}
              freeSolo
              id={`query-${promQuery.queryid}-query-name`}
              options={seriesList}
              getOptionLabel={(option: Option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t(
                    'analyticsDashboard.applicationDashboards.tuneTheQueries.metric'
                  )}
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{ className: classes.formLabel }}
                />
              )}
              onChange={(event, value, reason) => {
                const newQuery: string = value
                  ? reason === 'create-option'
                    ? (value as string)
                    : (value as Option).name
                  : '';
                const exitingLocalBaseQuery = localQuery.base_query;
                setLocalQuery({
                  ...localQuery,
                  base_query: newQuery,
                  prom_query_name: newQuery,
                  labels_and_values_list: [],
                });
                if (
                  newQuery !== '' &&
                  dsURL !== '' &&
                  exitingLocalBaseQuery !== newQuery &&
                  open
                ) {
                  setSelectedValuesForLabel([]);
                  refetch();
                }
                setUpdate(true);
              }}
            />
            <div
              className={`${classes.flex} ${classes.paddedTop}`}
              style={{ gap: '1rem' }}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
                style={{ width: '25%' }}
                color="primary"
              >
                <InputLabel className={classes.selectTextLabel}>
                  {t(
                    'analyticsDashboard.applicationDashboards.tuneTheQueries.keys'
                  )}
                </InputLabel>
                <Select
                  value={selectedLabel}
                  onChange={(event: any) => {
                    setSelectedLabel(event.target.value as string);
                    getSelectedValuesForLabel(event.target.value as string);
                  }}
                  label={t(
                    'analyticsDashboard.applicationDashboards.tuneTheQueries.selectKey'
                  )}
                  className={classes.selectText}
                  disabled={
                    labelValueData &&
                    labelValueData.GetPromLabelNamesAndValues.labelValues
                      ? !(
                          labelValueData.GetPromLabelNamesAndValues.labelValues
                            .length > 0
                        )
                      : true
                  }
                >
                  {labelValueData &&
                    labelValueData.GetPromLabelNamesAndValues.labelValues?.map(
                      (labelValue: LabelValue) => (
                        <MenuItem
                          key={labelValue.label}
                          value={labelValue.label}
                        >
                          {labelValue.label}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>

              <AutocompleteChipInput
                value={selectedValuesForLabel}
                onChange={(event, value) => {
                  const selectedValues: Array<Option> = value as Array<Option>;
                  const existingLabelValuesList: QueryLabelValue[] =
                    localQuery.labels_and_values_list ?? [];
                  let updateStatus = false;
                  existingLabelValuesList.forEach((labelValue, index) => {
                    if (labelValue.label === selectedLabel) {
                      existingLabelValuesList[index].value = selectedValues.map(
                        (option) => option.name
                      );
                      updateStatus = true;
                    }
                  });
                  if (!updateStatus) {
                    existingLabelValuesList.push({
                      label: selectedLabel,
                      value: selectedValues.map((option) => option.name),
                    });
                  }
                  setLocalQuery({
                    ...localQuery,
                    prom_query_name: setLabelsAndValues(
                      localQuery.base_query ?? '',
                      localQuery.prom_query_name ?? '',
                      existingLabelValuesList
                    ),
                    labels_and_values_list: existingLabelValuesList,
                  });
                  getSelectedValuesForLabel(selectedLabel ?? '');
                  setUpdate(true);
                }}
                getOptionSelected={(option) =>
                  selectedValuesForLabel
                    .map((selections) => selections.name)
                    .includes(option.name)
                }
                options={getAvailableValues(selectedLabel ?? '')}
                label={t(
                  'analyticsDashboard.applicationDashboards.tuneTheQueries.values'
                )}
                placeholder={`${t(
                  'analyticsDashboard.applicationDashboards.tuneTheQueries.addValue'
                )}`}
                disableCloseOnSelect
                disableClearable={false}
                limitTags={4}
                style={{ width: '75%' }}
              />
            </div>

            <PrometheusQueryEditor
              index={index}
              content={localQuery.prom_query_name ?? ''}
              seriesListCompletionOptions={
                seriesList.map((option: Option) => ({
                  value: option.name,
                  score: 1,
                  meta: t(
                    'analyticsDashboard.applicationDashboards.tuneTheQueries.seriesName'
                  ),
                })) ?? []
              }
              labelListCompletionOptions={
                labelValueData?.GetPromLabelNamesAndValues.labelValues?.map(
                  (labelValue: LabelValue) => ({
                    value: labelValue.label,
                    score: 2,
                    meta: localQuery.base_query
                      ? `${t(
                          'analyticsDashboard.applicationDashboards.tuneTheQueries.labelFor'
                        )} ${localQuery.base_query}`
                      : t(
                          'analyticsDashboard.applicationDashboards.tuneTheQueries.label'
                        ),
                  })
                ) ?? []
              }
              valueListCompletionOptions={getValueList(
                labelValueData?.GetPromLabelNamesAndValues.labelValues ?? []
              )}
              saveQueryChange={(updatedQuery: string) => {
                const existingBaseQuery: string = localQuery.base_query ?? '';
                const newBaseQuery: string = updatedQuery
                  .split('{')[0]
                  .includes('(')
                  ? updatedQuery
                      .split('{')[0]
                      .substring(
                        updatedQuery.split('{')[0].lastIndexOf('(') + 1
                      )
                  : updatedQuery.split('{')[0];
                setLocalQuery({
                  ...localQuery,
                  base_query: newBaseQuery,
                  labels_and_values_list: getLabelsAndValues(updatedQuery),
                  prom_query_name: updatedQuery,
                });
                if (
                  existingBaseQuery !== newBaseQuery &&
                  localQuery.base_query !== '' &&
                  dsURL !== '' &&
                  open
                ) {
                  setSelectedValuesForLabel([]);
                  refetch();
                }
                setUpdate(true);
              }}
            />

            <div className={`${classes.flex} ${classes.legend}`}>
              <InputField
                label={t(
                  'analyticsDashboard.applicationDashboards.tuneTheQueries.legend'
                )}
                data-cy="queryLegend"
                fullWidth
                variant="primary"
                value={localQuery.legend}
                disabled
              />
              <InfoTooltip
                value={t(
                  'analyticsDashboard.applicationDashboards.tuneTheQueries.legendInfo'
                )}
                className={classes.infoIcon}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QueryEditor;
