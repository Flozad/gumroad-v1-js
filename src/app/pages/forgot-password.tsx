import React from 'react';
import Layout from '../components/Layout';

const ForgotPassword: React.FC = () => {
  const showError = false;
  const errorMessage = "Some error message";
  const successMessage = "Check your email for a link to reset your password.";
  const emailAddress = "john@example.com";

  return (
    <Layout title="Forgot Password" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-forgot-password">
      <form id="large-form" action="/forgot-password" method="post">
        {showError ? (
          <h3>Enter your email address <small className="error">{errorMessage}</small></h3>
        ) : successMessage ? (
          <h3>{successMessage}</h3>
        ) : (
          <h3>Enter your email address <small>And don&apos;t worry about forgetting your password, we do too!</small></h3>
        )}
        <p>
          <input type="text" placeholder="Email Address" name="email" value={emailAddress} />
          <button type="submit">Send email</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default ForgotPassword;
