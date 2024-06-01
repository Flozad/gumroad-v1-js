/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { isAuthenticated, getUserId } from '../utils/auth';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
        const userId = getUserId();
        const response = await fetch(`/api/dashboard?userId=${userId}`);
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

  const sortedPurchases = Object.entries(data.groupedPurchases).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());
  const sortedLabels = sortedPurchases.map(([date]) => date);
  const sortedValues = sortedPurchases.map(([, value]) => value);

  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Purchases',
        data: sortedValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <Layout title="Home" hideFooter={false} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={data.purchaseTotal} bodyId="page-home">
      <div id="dashboard">
        <div className="chart">
          {data.showChart ? (
            <Line data={chartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Purchases Over Time'
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Amount'
                  }
                }
              }
            }} />
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
      <br />
      <br />
      <button onClick={() => router.push('/stats')} style={{ padding: '10px 20px', backgroundColor: '#EB6841', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>See stats</button>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default Home;
