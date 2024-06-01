/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { isAuthenticated, getUserId } from '../utils/auth';

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard?userId=' + getUserId());
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setShowError(true);
          setErrorMessage('Failed to fetch data');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchData();
  }, [router]);

  if (!data) return <div>Loading...</div>;

  return (
    <Layout title="Home" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-home">
      <div id="dashboard">
        {showError ? (
          <h3 className="error">{errorMessage}</h3>
        ) : (
          <h3>Last {data.numberOfDays} day{data.numberOfDays > 1 ? 's' : ''}</h3>
        )}
        <div className="chart">
          {data.showChart ? (
            <img alt="chart" src={`http://chart.apis.google.com/chart?chxr=0,0,${data.chartMax}&chf=bg,s,ffffff&chxt=y&chbh=a&chs=640x225&chco=CC333F,EB6841&cht=bvg&chds=0,${data.chartMax}&chd=t:${data.chartNumbers}`} width="640" height="225" />
          ) : (
            <p>Wait a few days and a chart will show up here!</p>
          )}
        </div>
        <div className="mini-rule"></div>
        <div id="history">
          <h4>History:</h4>
          <p><strong>${data.lastSevenDaysPurchaseTotal}</strong> in the past 7 days.</p>
          <p><strong>${data.lastMonthPurchaseTotal}</strong> in the past month.</p>
          <p><strong>${data.purchaseTotal}</strong> in total.</p>
        </div>
        <div className="rainbow bar" id="loading-bar"></div>
        <button onClick={() => router.push('/link')} style={{ padding: '10px 20px', backgroundColor: '#EB6841', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Create Link</button>
      </div>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default Home;
