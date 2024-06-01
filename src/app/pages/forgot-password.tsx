import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      if (response.data.success) {
        setSuccessMessage('Check your email for a link to reset your password.');
      } else {
        setShowError(true);
        setErrorMessage(response.data.message || 'An error occurred.');
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <Layout title="Forgot Password" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-forgot-password">
      <form id="large-form" onSubmit={handleFormSubmit}>
        {showError ? (
          <h3>Enter your email address <small className="error">{errorMessage}</small></h3>
        ) : successMessage ? (
          <h3>{successMessage}</h3>
        ) : (
          <h3>Enter your email address <small>And don&apos;t worry about forgetting your password, we do too!</small></h3>
        )}
        <p>
          <input type="text" placeholder="Email Address" name="email" value={email} onChange={handleInputChange} />
          <button type="submit">Send email</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default ForgotPassword;
