import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Account: React.FC = () => {
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const showError = false;
  const errorMessage = "Some error message";
  const name = "John Doe";
  const emailAddress = "john@example.com";
  const paymentAddress = "paypal@example.com";

  if (!isClient) {
    return null;
  }

  return (
    <Layout title="Account Settings" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={0} bodyId="page-account">
      <form id="large-form" action="/settings" method="post">
        {showError ? (
          <h3>Your account settings <small className="error">{errorMessage}</small></h3>
        ) : (
          <h3>Your account settings <small>a setting you can&apos;t change: how awesome you are</small></h3>
        )}
        <p>
          <label htmlFor="name">Full name: </label>
          <input id="name" name="name" type="text" placeholder="Full Name" value={name} />
        </p>
        <p>
          <label htmlFor="email">Email address: </label>
          <input type="text" placeholder="Email Address" name="email" value={emailAddress} />
        </p>
        <p>
          <label htmlFor="payment_address">PayPal address: </label>
          <input id="payment_address" name="payment_address" type="text" placeholder="PayPal Address" value={paymentAddress} />
        </p>
        <p>
          <button type="submit">Update account details</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default Account;
