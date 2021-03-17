import React from 'react';
import { Line } from 'react-chartjs-2';
// import moment from 'moment';
import PropTypes from 'prop-types';

import { ChartColors } from './chartsData/chartData';

const MultiLineChart = ({
  data1, data2, labels, selectedComparisonIndex,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: selectedComparisonIndex.toUpperCase(),
        fill: false,
        backgroundColor: ChartColors.igGPositive,
        lineTension: 0.2,
        borderColor: ChartColors.igGPositive,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: ChartColors.igGPositive,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: ChartColors.igGPositive,
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: data2,
      },
      {
        label: 'Tejimandi',
        fill: false,
        lineTension: 0.2,
        backgroundColor: ChartColors.igMPositive,
        borderColor: ChartColors.igMPositive,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: ChartColors.igMPositive,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: ChartColors.igMPositive,
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: data1,
      },
    ],
  };

  const lineOptions = {
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 20,
        },
        gridLines: {
          display: true,
        },
      }],
      xAxes: [{
        gridLines: {
          display: true,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,

        },
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };
  return <Line data={data} options={lineOptions} />;
};

MultiLineChart.propTypes = {
  data1: PropTypes.instanceOf(Array),
  data2: PropTypes.instanceOf(Array),
  labels: PropTypes.instanceOf(Array),
  selectedComparisonIndex: PropTypes.instanceOf(String),
};

MultiLineChart.defaultProps = {
  data1: [],
  data2: [],
  labels: [],
  selectedComparisonIndex: '',
};
export default MultiLineChart;
