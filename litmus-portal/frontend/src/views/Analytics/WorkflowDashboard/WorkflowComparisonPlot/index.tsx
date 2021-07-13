/* eslint-disable max-len */
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import Plotly from 'plotly.js';
import React, { useEffect } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import { selectorOptions } from '../../../../utils/selectorOptions';
import Score from './Score';
import useStyles, { useOutlinedInputStyles } from './style';

const Plot = createPlotlyComponent(Plotly);

interface ResilienceScoreComparisonPlotProps {
  xData: { Hourly: string[][]; Daily: string[][]; Monthly: string[][] };
  yData: { Hourly: number[][]; Daily: number[][]; Monthly: number[][] };
  labels: string[];
  colors: string[];
}

interface AverageDateWiseResilienceScores {
  Hourly: {
    dates: string[];
    avgResilienceScores: number[];
  };
  Daily: {
    dates: string[];
    avgResilienceScores: number[];
  };
  Monthly: {
    dates: string[];
    avgResilienceScores: number[];
  };
}

const ResilienceScoreComparisonPlot: React.FC<ResilienceScoreComparisonPlotProps> =
  ({ xData, yData, labels, colors }) => {
    const classes = useStyles();
    const { palette } = useTheme();
    const outlinedInputClasses = useOutlinedInputStyles();
    const [currentGranularity, setCurrentGranularity] = React.useState<{
      name: string;
    }>({
      name: 'Daily',
    });

    const handleChangeInGranularity = (
      event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
      const name = event.target.name as keyof typeof currentGranularity;
      if (name !== currentGranularity.name) {
        setCurrentGranularity({
          ...currentGranularity,
          [name]: event.target.value as string,
        });
      }
    };

    const [plotData, setPlotData] = React.useState<any[]>([]);

    const [edgeData, setEdgeData] = React.useState({
      highScore: 0,
      lowScore: 0,
      highColor: '',
      lowColor: '',
      highName: '',
      lowName: '',
    });

    const [plotLayout, setPlotLayout] = React.useState<any>({});

    // Function to convert UNIX time in format of DD MMM YYY
    const formatDate = (date: string, dateFormat: string) => {
      const updated = new Date(parseInt(date, 10) * 1000).toString();
      const resDate = moment(updated).format(dateFormat);
      return resDate;
    };

    // Function to calculate average of resilience scores based on all dates with range as edge dates
    const avgWorkflowsAll = () => {
      const averageDateWiseResilienceScores: AverageDateWiseResilienceScores = {
        Hourly: {
          dates: [],
          avgResilienceScores: [],
        },
        Daily: {
          dates: [],
          avgResilienceScores: [],
        },
        Monthly: {
          dates: [],
          avgResilienceScores: [],
        },
      };

      for (let i = 0; i < xData.Hourly.length; i += 1) {
        for (let j = 0; j < xData.Hourly[i].length; j += 1) {
          const date: string = xData.Hourly[i][j];
          let sum: number = 0;
          let count: number = 0;
          for (let k = 0; k < xData.Hourly.length; k += 1) {
            if (
              xData.Hourly[k].includes(date) &&
              !averageDateWiseResilienceScores.Hourly.dates.includes(date)
            ) {
              sum += yData.Hourly[k][xData.Hourly[k].indexOf(date)];
              count += 1;
            }
          }
          if (count !== 0) {
            averageDateWiseResilienceScores.Hourly.dates.push(date);
            averageDateWiseResilienceScores.Hourly.avgResilienceScores.push(
              parseFloat((sum / count).toFixed(2))
            );
          }
        }
      }

      for (let i = 0; i < xData.Daily.length; i += 1) {
        for (let j = 0; j < xData.Daily[i].length; j += 1) {
          const date: string = xData.Daily[i][j];
          let sum: number = 0;
          let count: number = 0;
          for (let k = 0; k < xData.Daily.length; k += 1) {
            if (
              xData.Daily[k].includes(date) &&
              !averageDateWiseResilienceScores.Daily.dates.includes(date)
            ) {
              sum += yData.Daily[k][xData.Daily[k].indexOf(date)];
              count += 1;
            }
          }
          if (count !== 0) {
            averageDateWiseResilienceScores.Daily.dates.push(date);
            averageDateWiseResilienceScores.Daily.avgResilienceScores.push(
              parseFloat((sum / count).toFixed(2))
            );
          }
        }
      }

      for (let i = 0; i < xData.Monthly.length; i += 1) {
        for (let j = 0; j < xData.Monthly[i].length; j += 1) {
          const date: string = xData.Monthly[i][j];
          let sum: number = 0;
          let count: number = 0;
          for (let k = 0; k < xData.Monthly.length; k += 1) {
            if (
              xData.Monthly[k].includes(date) &&
              !averageDateWiseResilienceScores.Monthly.dates.includes(date)
            ) {
              sum += yData.Monthly[k][xData.Monthly[k].indexOf(date)];
              count += 1;
            }
          }
          if (count !== 0) {
            averageDateWiseResilienceScores.Monthly.dates.push(date);
            averageDateWiseResilienceScores.Monthly.avgResilienceScores.push(
              parseFloat((sum / count).toFixed(2))
            );
          }
        }
      }
      return averageDateWiseResilienceScores;
    };

    const argSort = (arr1: number[], arr2: number[]) =>
      arr1
        .map((item: any, index: number) => [arr2[index], item]) // add the args to sort by
        .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
        .map(([, item]) => item); // extract the sorted items

    const processData = () => {
      const calculatedAverageAll: AverageDateWiseResilienceScores =
        avgWorkflowsAll();
      let dataX = [['']];
      let dataY = [[0]];
      let xAvg: string[] = [];
      let yAvg: number[] = [];
      let avgDateFormat: string = '';
      if (currentGranularity.name === 'Hourly') {
        dataX = xData.Hourly;
        dataY = yData.Hourly;
        xAvg = calculatedAverageAll.Hourly.dates;
        yAvg = calculatedAverageAll.Hourly.avgResilienceScores;
        avgDateFormat = 'YYYY-MM-DD HH:mm:ss';
      }
      if (currentGranularity.name === 'Daily') {
        dataX = xData.Daily;
        dataY = yData.Daily;
        xAvg = calculatedAverageAll.Daily.dates;
        yAvg = calculatedAverageAll.Daily.avgResilienceScores;
        avgDateFormat = 'YYYY-MM-DD';
      }
      if (currentGranularity.name === 'Monthly') {
        dataX = xData.Monthly;
        dataY = yData.Monthly;
        xAvg = calculatedAverageAll.Monthly.dates;
        yAvg = calculatedAverageAll.Monthly.avgResilienceScores;
        avgDateFormat = 'YYYY-MM';
      }
      const lineSize: number[] = Array(labels?.length).fill(3);
      const data = [];
      const series: number[] = Array(labels?.length).fill(0);
      const lengths: number[] = Array(labels?.length).fill(0);

      for (let i = 0; i < dataX.length; i += 1) {
        const result = {
          x: dataX[i],
          y: dataY[i],
          type: 'scatter',
          mode: 'lines + text',
          line: {
            shape: 'spline',
            color: colors[i],
            width: lineSize[i],
          },
          name: labels ? labels[i] : '',
        };
        data.push(result);
        for (let j = 0; j < dataY[i].length; j += 1) {
          series[i] += dataY[i][j];
        }
        lengths[i] = dataY[i].length;
      }

      const unixTimeArray: number[] = [];
      xAvg.forEach((x) => {
        unixTimeArray.push(parseInt(moment(x).format('X'), 10));
      });
      const argSortResultY = argSort(yAvg, unixTimeArray).reverse();
      const sortedResultX = unixTimeArray.sort(function difference(a, b) {
        return a - b;
      });
      const datesX: string[] = [];
      sortedResultX.forEach((date) => {
        datesX.push(formatDate(date.toString(), avgDateFormat));
      });

      const avgResult = {
        x: datesX,
        y: argSortResultY,
        type: 'scatter',
        mode: 'lines',
        line: {
          shape: 'spline',
          dash: 'dash',
          color: palette.primary.main,
          width: 3,
        },
        name: 'Average Workflows',
      };
      data.push(avgResult);
      const normalized = Array(labels?.length).fill(0);
      for (let k = 0; k < lengths.length; k += 1) {
        normalized[k] = series[k] / lengths[k];
      }
      const max = Math.max(...normalized);
      const maxID = normalized.indexOf(max);
      const min = Math.min(...normalized);
      const minID = normalized.indexOf(min);
      setEdgeData({
        highScore: parseFloat(max.toFixed(2)),
        lowScore: parseFloat(min.toFixed(2)),
        highColor: colors[maxID],
        lowColor: colors[minID],
        highName: labels ? labels[maxID] : '',
        lowName: labels ? labels[minID] : '',
      });
      setPlotData(data);
    };

    const processLayout = () => {
      const layout = {
        xaxis: {
          showgrid: true,
          gridcolor: palette.border.main,
          showline: false,
          showticklabels: true,
          linecolor: palette.border.main,
          linewidth: 0.5,
          ticks: 'outside',
          tickcolor: palette.border.main,
          tickwidth: 2,
          ticklen: 5,
          tickfont: {
            family: 'Ubuntu',
            color: palette.text.hint,
          },
          mirror: true,
          rangeselector: selectorOptions as any,
          rangeslider: { visible: true },
        },
        yaxis: {
          showgrid: true,
          gridcolor: palette.border.main,
          zeroline: false,
          showline: false,
          showticklabels: true,
          linecolor: palette.border.main,
          linewidth: 0.5,
          ticks: 'outside',
          tickcolor: palette.border.main,
          tickwidth: 2,
          ticklen: 5,
          tickfont: {
            family: 'Ubuntu',
            color: palette.text.hint,
          },
          mirror: true,
          tickmode: 'array',
          tickvals: [0, 20, 40, 60, 80, 100],
          ticktext: ['0', '20', '40', '60', '80', '100'],
          range: [-10, 110],
        },
        cliponaxis: true,
        layer: 'below_traces',
        autosize: true,
        margin: {
          autoexpand: false,
          l: 60,
          r: 50,
          t: 30,
          b: 130,
        },
        font: {
          family: 'Ubuntu, monospace',
          color: palette.text.hint,
        },
        showlegend: true,
        legend: { orientation: 'h', y: -0.5 },
        modebar: {
          bgcolor: palette.background.paper,
        },
        paper_bgcolor: palette.background.paper,
        plot_bgcolor: palette.background.paper,
      };
      setPlotLayout(layout);
    };

    useEffect(() => {
      processData();
      processLayout();
    }, [currentGranularity]);

    return (
      <div style={{ alignContent: 'center', width: '100%' }}>
        <div className={classes.flexDisplay}>
          <div className={classes.adjust}>
            <Score
              score={edgeData.highScore}
              high
              color={edgeData.highColor}
              name={edgeData.highName}
            />
          </div>
          <Score
            score={edgeData.lowScore}
            high={false}
            color={edgeData.lowColor}
            name={edgeData.lowName}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            color="primary"
            focused
          >
            <InputLabel
              htmlFor="outlined-selection-granularity"
              className={classes.selectText}
            >
              Granularity
            </InputLabel>
            <Select
              value={currentGranularity.name}
              onChange={handleChangeInGranularity}
              label="Granularity"
              inputProps={{
                name: 'name',
                id: 'outlined-selection-granularity',
              }}
              className={classes.selectText}
              input={<OutlinedInput classes={outlinedInputClasses} />}
            >
              <MenuItem value="Hourly">Hourly</MenuItem>
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.plot}>
          <Plot
            data={plotData}
            layout={plotLayout}
            useResizeHandler
            style={{
              width: '166.55%',
              height: 720,
              margin: 'auto',
            }}
            config={{
              displaylogo: false,
              autosizable: true,
              responsive: true,
              frameMargins: 0.2,
              showAxisDragHandles: true,
              showAxisRangeEntryBoxes: true,
              showTips: true,
              displayModeBar: true,
              toImageButtonOptions: {
                format: 'png',
                filename: 'ResilienceScores_Comparison',
                width: 1920,
                height: 1080,
                scale: 2,
              },
            }}
            onInitialized={() => {
              try {
                const nodeStyle = (
                  document.getElementsByClassName('modebar')[0] as HTMLElement
                ).style;
                nodeStyle.left = '39%';
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </div>
      </div>
    );
  };

export default ResilienceScoreComparisonPlot;
