import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { isAuthenticated, getUserId } from '../utils/auth';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/home');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);

        // Make a fake call to populate dashboard data
        await fetch('/api/cron/populate-dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: getUserId() }),
        });

        router.push('/home');
      } else {
        const data = await response.json();
        setShowError(true);
        setErrorMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <Layout title="Login" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-login">
    <div className="top-bar"></div>
      <form id="large-form" action="/login" method="post" onSubmit={handleFormSubmit}>
        <h3>Login {showError && <small className="error">{errorMessage}</small>}</h3>
        <p>
          <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          <button type="submit">Login</button>
        </p>
        <p>Don&apos;t have an account? <Link href="/">Create one here</Link></p>
        <p><Link href="/forgot-password">Forgot your password?</Link></p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default LoginPage;
