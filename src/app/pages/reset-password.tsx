import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <Layout title="Reset Password" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-reset-password">
      <form id="large-form" action={`/reset-password/${router.query.reset_hash}`} method="post" onSubmit={handleFormSubmit}>
        <h3>
          Reset your password
          {showError && <small className="error">{errorMessage}</small>}
          {successMessage && <small className="success">{successMessage}</small>}
        </h3>
        <p>
          <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          <button type="submit">Reset Password and Login</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default ResetPasswordPage;
