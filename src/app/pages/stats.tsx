import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const StatsPage: React.FC = () => {
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const number_of_links = 123; // Replace with actual data
  const number_of_users = 456; // Replace with actual data
  const purchase_total = 7890; // Replace with actual data
  const number_of_purchases = 1011; // Replace with actual data
  const average_purchase = (purchase_total / number_of_purchases).toFixed(2);
  const number_of_views = 1213; // Replace with actual data
  const number_of_downloads = 1415; // Replace with actual data
  const average_views = (number_of_views / number_of_links).toFixed(2);
  const average_downloads = (number_of_downloads / number_of_links).toFixed(2);
  const last_link_date = "2 days"; // Replace with actual data
  const last_purchase_date = "3 hours"; // Replace with actual data
  if (!isClient) {
    return null;
  }

  return (
    <Layout title="Stats" hideFooter={false} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-stats">
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
        <p>The last purchase was made <strong>{last_purchase_date}</strong> ago.</p>
      </div>
    </Layout>
  );
};

export default StatsPage;
