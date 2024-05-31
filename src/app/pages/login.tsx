import React, { useState } from 'react';
import Layout from '../components/Layout';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <Layout title="Login" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-login">
      <form id="large-form" action="/login" method="post" onSubmit={handleFormSubmit}>
        <h3>Login {showError && <small className="error">{errorMessage}</small>}</h3>
        <p>
          <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          <button type="submit">Login</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default LoginPage;
