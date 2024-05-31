/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  const showError = false;
  const errorMessage = "Some error message";
  const numberOfDays = 7;
  const s = numberOfDays > 1 ? "s" : "";
  const showChart = true;
  const chartMax = 100;
  const chartNumbers = "10,20,30,40,50";
  const lastSevenDaysPurchaseTotal = 100;
  const lastMonthPurchaseTotal = 400;
  const purchaseTotal = 1000;

  return (
    <Layout title="Home" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-home">
      <div id="dashboard">
        {showError ? (
          <h3 className="error">{errorMessage}</h3>
        ) : (
          <h3>Last {numberOfDays} day{s}</h3>
        )}
        <div className="chart">
          {showChart ? (
            <img alt="chart" src={`http://chart.apis.google.com/chart?chxr=0,0,${chartMax}&chf=bg,s,ffffff&chxt=y&chbh=a&chs=640x225&chco=CC333F,EB6841&cht=bvg&chds=0,${chartMax}&chd=t:${chartNumbers}`} width="640" height="225" />
          ) : (
            <p>Wait a few days and a chart will show up here!</p>
          )}
        </div>
        <div className="mini-rule"></div>
        <div id="history">
          <h4>History:</h4>
          <p><strong>${lastSevenDaysPurchaseTotal}</strong> in the past 7 days.</p>
          <p><strong>${lastMonthPurchaseTotal}</strong> in the past month.</p>
          <p><strong>${purchaseTotal}</strong> in total.</p>
        </div>
        <div className="rainbow bar" id="loading-bar"></div>
      </div>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default Home;
