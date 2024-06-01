import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { isAuthenticated, getUserId } from '../utils/auth';
import axios from 'axios';

const Account: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    payment_address: '',
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${getUserId()}`);
        setUserBalance(response.data.balance);
        if (response.status === 200) {
          setFormData(response.data);
        } else {
          setShowError(true);
          setErrorMessage('Failed to fetch user data');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchUserData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');

    try {
      const response = await axios.put(`/api/user/${getUserId()}`, formData);
      if (response.status === 200) {
        router.push('/home');
      } else {
        setShowError(true);
        setErrorMessage('Failed to update user data');
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <Layout title="Account Settings" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={userBalance} bodyId="page-account">
      <form id="large-form" onSubmit={handleFormSubmit}>
        {showError ? (
          <h3>Your account settings <small className="error">{errorMessage}</small></h3>
        ) : (
          <h3>Your account settings <small>a setting you can&apos;t change: how awesome you are</small></h3>
        )}
        <p>
          <label htmlFor="name">Full name: </label>
          <input id="name" name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="email">Email address: </label>
          <input type="text" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="payment_address">PayPal address: </label>
          <input id="payment_address" name="payment_address" type="text" placeholder="PayPal Address" value={formData.payment_address} onChange={handleInputChange} />
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
