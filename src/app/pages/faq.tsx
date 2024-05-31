import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Faq: React.FC = () => (
  <Layout title="FAQ" hideFooter={false} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-faq">
    <div id="main-content">
      <h3>Learn the ins and outs of Gumroad.</h3>
      <div className="mini-rule"></div>
      <ol>
        <li>
          <h4>What can I charge per link?</h4>
          <p>Each link can be as little as $0.99 and as much as $999. Feel limited? <Link to="mailto:hi@gumroad.com">Email us</Link>.</p>
        </li>
        <li>
          <h4>What is Gumroad&apos;s cut?</h4>
          <p>Simple. It&apos;s 5% + $0.30 for each transaction. We&apos;re working hard to get this lower.</p>
        </li>
        <li>
          <h4>How do I get paid?</h4>
          <p>A PayPal deposit at the end of every month. We are looking into alternatives.</p>
        </li>
        <li>
          <h4>Why is this FAQ so short?</h4>
          <p>We believe that with simple products come short FAQs. Please <Link to="mailto:hi@gumroad.com">send us an email</Link> if you have a question that isn&apos;t answered here.</p>
        </li>
      </ol>
    </div>
  </Layout>
);

export default Faq;
