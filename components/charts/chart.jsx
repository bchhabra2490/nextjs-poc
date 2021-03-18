import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Select, MenuItem, ButtonGroup, Button, Hidden,
} from '@material-ui/core';
import Image from 'next/image';
import { createApolloFetch } from 'apollo-fetch';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import MultiLineChart from './multiLineChart';
import BarChart from './barChart';
import SideBull from '../../assets/svgs/sideBull';

function getDate(timestamp) {
  const d = new Date(timestamp);
  return moment(d).format('DD MMM YY');
}

function calculateMonths() {
  const currentDate = new Date();
  const startDate = new Date(2020, 2, 1);

  let months;
  months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += currentDate.getMonth();
  return months <= 0 ? 0 : months;
}

function calculateInterestValues(interestRate) {
  const numberOfMonths = calculateMonths();
  console.log(numberOfMonths);
  return (100 * (1 + (interestRate / 100) * (numberOfMonths / 12))).toFixed(2);
}

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

const apolloFetch = createApolloFetch({ uri });

const chartDataQuery = `query getSmallcaseHistory($scid: ID!, $benchmarkId: ID!, $duration: String){
  getSmallcaseHistory(scid: $scid, benchmarkId: $benchmarkId, duration: $duration){
    scid,
    points{
      date,
      value
    },
    benchmark{
      benchmarkId
      points{
        date,
        value
      }
    }
  }
}`;

// const chartDataQuery = `query getPortfolio($period: String!, $index: String, $portfolioId: ID!) {
//     getPortfolio(ID: $portfolioId){
//       performance(period: $period, index: $index) {
//         portfolioPoints {
//           time
//           value
//         }
//         benchmarkPoints {
//           time
//           value
//         }
//       }
//     }

//   }`;

const cagrData = `query {
    getSmallcaseList {
      scid
      stats {
        ratios {
          cagr
        }
      }
    }
  }`;

const useStyles = makeStyles((theme) => ({
  chartSection: {
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: '-180px',
    },
  },
  performanceText: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  selectMenu: {
    fontSize: 14,
    marginLeft: '5px',
    fontWeight: 'bold',
    color: '#0082FF',
  },
  selectedButton: {
    color: theme.palette.primary.main,
  },
}));

const ChartSection = ({
  getAppLink, paretClasses, showAppDownloads,
}) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('max');
  const [comparisonIndex, setComparisonIndex] = useState('nifty');
  const [CAGR, setCAGR] = useState(0);
  const [tejimandiReturnValue, setTejimandiReturnValue] = useState(0);
  const [niftyValue, setNiftyValue] = useState(0);
  const [barchartDate, setBarChartDate] = useState(moment(Date.parse('1/2/2020')).format('DD MMMM, YYYY'));

  useEffect(() => {
    apolloFetch({
      query: cagrData,
    })
      .then((response) => {
        console.log('Response CAGR', response);

        let rate = 0;
        if (response.data.getSmallcaseList !== null) {
          const index = response.data.getSmallcaseList.findIndex((smallcase) => smallcase.scid === 'TJMMO_0003');
          if (index > -1) {
            rate = response.data.getSmallcaseList[index].stats.ratios.cagr * 100;
          }
        }
        setCAGR(rate);
      }).catch((e) => {
        console.log(e.message);
        setCAGR(0);
      });
  }, []);

  useEffect(() => {
    const variables = {
      scid: process.env.NEXT_PUBLIC_SMALLCASE_ID || 'TJMMO_0005',
      duration: 'max',
      benchmarkId: '.NSEI',
    };
    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers = {
        'api-version': 2,
      };
      next();
    });
    console.log(variables);
    apolloFetch({
      query: chartDataQuery,
      variables,
    })
      .then((response) => {
        if (response && response.data != null && response.data.getSmallcaseHistory != null) {
          console.log('Response', response.data.getSmallcaseHistory.points[response.data.getSmallcaseHistory.points.length - 1].value);
          setTejimandiReturnValue(response.data.getSmallcaseHistory.points[response.data.getSmallcaseHistory.points.length - 1].value);
          setNiftyValue(response.data.getSmallcaseHistory.benchmark.points[response.data.getSmallcaseHistory.benchmark.points.length - 1].value);
          setBarChartDate(moment(response.data.getSmallcaseHistory.benchmark.points[0].date).format('DD MMMM, YYYY'));
        }
      }).catch((e) => {
        console.log(e.message);
        setTejimandiReturnValue(null);
        setNiftyValue(0);
      });
  }, []);

  useEffect(() => {
    const variables = {
      scid: process.env.NEXT_PUBLIC_SMALLCASE_ID || 'TJMMO_0005',
      duration: selectedPeriod,
      benchmarkId: '.NIFTY500',
    };
    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers = {
        'api-version': 2,
      };
      next();
    });
    console.log(variables);
    apolloFetch({
      query: chartDataQuery,
      variables,
    })
      .then((response) => {
        console.log('Response', response);
        setData(response.data);
      }).catch((e) => {
        console.log(e.message);
        setData(null);
      });
  }, [selectedPeriod]);

  console.log('Data: ', data);
  const benchmarkPoints = data && data.getSmallcaseHistory && data.getSmallcaseHistory.benchmark ? data.getSmallcaseHistory.benchmark.points : [];
  const portfolioPoints = data && data.getSmallcaseHistory && data.getSmallcaseHistory.benchmark ? data.getSmallcaseHistory.points : [];
  const performaceData = portfolioPoints.map((point) => ({ x: getDate(point.date), y: parseFloat(point.value) }));
  const benchmarkData = benchmarkPoints.map((point) => ({ x: getDate(point.date), y: parseFloat(point.value) }));
  const labels = portfolioPoints.map((point) => getDate(point.date));
  let date = moment(Date.parse('1/2/2020')).format('DD MMMM, YYYY');
  if (portfolioPoints != null && portfolioPoints[0] != null) {
    date = moment(portfolioPoints[0].date).format('DD MMMM, YYYY');
  }
  const selectedValue = performaceData && performaceData[performaceData.length - 1] ? performaceData[performaceData.length - 1].y : 'NA';
  return (
    <section className="wrapper-container" id="performance">
      {' '}
      <Grid container className="section-header">
        <h2>Performance</h2>

      </Grid>
      {CAGR > 10 && (
        <Grid container className="cagr-data">
          <h3>
            Average yearly return (CAGR):
            {' '}
            <span style={{ color: '#006004' }}>{`+${CAGR.toFixed(2)} %`}</span>
          </h3>
        </Grid>
      )}
      <Grid container>
        <Grid item xs={10} />
        <Grid item xs={2} style={{ marginTop: '-100px' }}>
          <SideBull />
        </Grid>
      </Grid>

      <Grid container style={{ justifyContent: 'center' }}>
        {/* Performance Chart */}
        <Grid item xs={12} sm={8} style={{ textAlign: 'center' }}>
          <div className={classes.chartSection}>
            <Grid item xs={12} className={classes.performanceText}>
              <Typography
                component="span"
                align="center"
                style={{ fontWeight: 'bold', color: 'primary', fontSize: '18px' }}
              >
                Past Performance
              </Typography>
              <Typography
                component="span"
                align="center"
                style={{ color: '#000', marginLeft: '5px', fontSize: '18px' }}
              >

                vs
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={comparisonIndex}
                onChange={(e) => { setComparisonIndex(e.target.value); }}
                disableUnderline
                className={classes.selectMenu}
                style={{ fontWeight: 'bold', fontSize: '18px' }}
              >
                <MenuItem value="fd-inflation">FD/Inflation</MenuItem>
                <MenuItem value="nifty">Nifty 500</MenuItem>
              </Select>
            </Grid>
            {comparisonIndex === 'nifty' && (
              <div>
                <Typography
                  component="h6"
                  align="center"
                  style={{ fontSize: '18px', marginBottom: '20px' }}
                >
                  Current value of ₹100 invested on
                  {' '}
                  {date}
                  {' '}
                  would be ₹
                  {selectedValue}
                </Typography>
                {performaceData.length > 0 && benchmarkData.length > 0 && (<MultiLineChart data1={performaceData} data2={benchmarkData} labels={labels} selectedComparisonIndex={comparisonIndex} />
                )}
                <ButtonGroup size="large" aria-label="large outlined primary button group" style={{ marginTop: '30px' }}>
                  <Button className={selectedPeriod === '1m' && classes.selectedButton} onClick={() => setSelectedPeriod('1m')}>1M</Button>
                  <Button className={selectedPeriod === '3m' && classes.selectedButton} onClick={() => setSelectedPeriod('3m')}>3M</Button>
                  <Button className={selectedPeriod === '6m' && classes.selectedButton} onClick={() => setSelectedPeriod('6m')}>6M</Button>
                  <Button className={selectedPeriod === 'max' && classes.selectedButton} onClick={() => setSelectedPeriod('max')}>MAX</Button>
                </ButtonGroup>
                <p>Disclaimer: Past performance does not equal future returns</p>
              </div>
            )}
            {comparisonIndex !== 'nifty' && (
              <div>
                <Typography
                  component="h6"
                  align="center"
                  style={{ fontSize: '18px', marginBottom: '20px' }}
                >
                  Current value of ₹100 invested on
                  {' '}
                  {barchartDate}
                  {' '}
                  would be
                </Typography>
                <Grid container>

                  <Grid item xs={3}>
                    <Typography
                      component="h4"
                      align="center"
                      style={{ color: '#006004', fontSize: '18px', fontWeight: 'bold' }}
                    >
                      Teji Mandi
                    </Typography>
                    <Typography
                      component="h4"
                      align="center"
                    >
                      ₹
                      {tejimandiReturnValue}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      component="h4"
                      align="center"
                      style={{ color: '#0082FF', fontSize: '18px', fontWeight: 'bold' }}
                    >
                      Nifty
                    </Typography>
                    <Typography
                      component="h4"
                      align="center"
                    >
                      ₹
                      {niftyValue}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      component="h4"
                      align="center"
                      style={{ color: '#9F45E4', fontSize: '18px', fontWeight: 'bold' }}
                    >
                      Fixed Deposit
                    </Typography>
                    <Typography
                      component="h4"
                      align="center"
                    >
                      ₹
                      {calculateInterestValues(6.0)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      component="h4"
                      align="center"
                      style={{ color: '#FFA800', fontSize: '18px', fontWeight: 'bold' }}
                    >
                      Inflation
                    </Typography>
                    <Typography
                      component="h4"
                      align="center"
                    >
                      ₹
                      {calculateInterestValues(5.5)}
                    </Typography>
                  </Grid>
                </Grid>
                <BarChart labels={['TejiMandi', 'Nifty', 'FD', 'Inflation']} chartData={[tejimandiReturnValue, niftyValue, calculateInterestValues(6.0), calculateInterestValues(5.5)]} />
              </div>
            )}
          </div>
        </Grid>
      </Grid>

      {/* {showAppDownloads && (
      <Hidden mdUp>
        <Grid container style={{ textAlign: 'center', marginTop: '30px' }}>
          <Grid item xs={12}>
            <a
              href={getAppLink()}
              target="_blank"
              rel="noreferrer"
              className={paretClasses.buttonLinkDefault}
            >
              DOWNLOAD THE APP NOW
            </a>
          </Grid>

        </Grid>
      </Hidden>
      )} */}
      {showAppDownloads && (
      <Hidden smDown>

        <div className={paretClasses.appStoreImageDiv}>
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.tejimandi.android"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/img/playstore.png" alt="Google Play" className={paretClasses.appStoreImage} />
            </a>
          </div>
          <div>
            <a
              rel="noreferrer"
              href="https://apps.apple.com/in/app/teji-mandi-portfolio-advisor/id1531900507"
              target="_blank"
            >
              <img src="/img/app_store.png" alt="Apple Store" className={paretClasses.appStoreImage} />
            </a>

          </div>
        </div>
      </Hidden>
      )}
    </section>

  );
};

ChartSection.propTypes = {
  paretClasses: PropTypes.instanceOf(Object).isRequired,
  getAppLink: PropTypes.instanceOf(Object).isRequired,
};

export default ChartSection;
