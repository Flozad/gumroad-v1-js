import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Custom404: React.FC = () => (
  <Layout title="404 - Page Not Found" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-404">
    <div id="main-content">
      <h3>404</h3>
      <div className="mini-rule"></div>
      <p>You&apos;ve reached a page that doesn&apos;t exist. <Link to="/home">Go home?</Link></p>
    </div>
  </Layout>
);

export default Custom404;
