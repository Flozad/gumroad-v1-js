import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const reset_hash = window.location.pathname.split('/').pop() as string;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!reset_hash) {
      setShowError(true);
      setErrorMessage('Invalid or expired reset link.');
    }
  }, [reset_hash]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`/api/auth/reset-password/${reset_hash}`, formData);
      if (response.data.success) {
        setSuccessMessage('Password reset successfully. You can now log in.');
        router.push('/login');
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
    <Layout title="Reset Password" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-reset-password">
      <form id="large-form" onSubmit={handleFormSubmit}>
        <h3>
          Reset your password
          {showError && <small className="error">{errorMessage}</small>}
          {successMessage && <small className="success">{successMessage}</small>}
        </h3>
        <p>
          <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleInputChange} />
          <button type="submit">Reset Password and Login</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default ResetPasswordPage;
