import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const MultiLineChart = ({
  labels, chartData,
}) => {
  const data = {
    labels,
    datasets: [{
      data: chartData,
      backgroundColor: ['#006004', '#0082FF', '#9F45E4', '#FFA800'],
    }],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 18,
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false,
        },
      }],
    },
  };
  return (<Bar data={data} options={options} />);
};

MultiLineChart.propTypes = {
  labels: PropTypes.instanceOf(Array).isRequired,
  chartData: PropTypes.instanceOf(Array).isRequired,
};

export default MultiLineChart;
