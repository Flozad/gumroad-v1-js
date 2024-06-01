import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../utils/auth';
import { useRouter } from 'next/router';

const StatsPage: React.FC = () => {
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
        const response = await fetch('/api/stats');
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

  const number_of_links = data.numberOfLinks || 0;
  const number_of_users = data.numberOfUsers || 0;
  const purchase_total = data.purchaseTotal || 0;
  const number_of_purchases = data.numberOfPurchases || 0;
  const average_purchase = (purchase_total / number_of_purchases).toFixed(2);
  const number_of_views = data.numberOfViews || 0;
  const number_of_downloads = data.numberOfDownloads || 0;
  const average_views = (number_of_views / number_of_links).toFixed(2);
  const average_downloads = (number_of_downloads / number_of_links).toFixed(2);
  const last_link_date = data.lastLinkDate || 'N/A';
  const last_purchase_date = data.lastPurchaseDate || 'N/A';

  return (
    <Layout title="Stats" hideFooter={false} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={data.balance} bodyId="page-stats">
      <div id="main-content">
        <h3>Gumroad lets you sell just like you share.</h3>
        <div className="mini-rule"></div>
        <p>There are <strong>{number_of_links}</strong> links and counting.</p>
        <p>There are <strong>{number_of_users}</strong> users and counting.</p>
        <p>There have been $<strong>{purchase_total}</strong> worth of purchases. There are <strong>{number_of_purchases}</strong> purchases and counting.</p>
        <p>That&apos;s an average of $<strong>{average_purchase}</strong> per purchase!</p>
        <p>They&apos;ve been viewed <strong>{number_of_views}</strong> times and downloaded <strong>{number_of_downloads}</strong> times.</p>
        <p>That&apos;s an average of <strong>{average_views}</strong> views and <strong>{average_downloads}</strong> downloads per link!</p>
        <p>The last link was added <strong>{last_link_date}</strong> ago.</p>
        <p>The last purchase was made <strong>{
        }</strong> ago.</p>
      </div>
    </Layout>
  );
};

export default StatsPage;
