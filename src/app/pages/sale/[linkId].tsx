import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const VisitingLinkPage: React.FC = () => {
  const router = useRouter();
  const { linkId } = router.query; // Assuming the linkId is passed as a query parameter
  const [formData, setFormData] = useState({
    card_number: '',
    expiry_month: '1',
    expiry_year: '2023',
    card_security_code: '',
  });
  const [message, setMessage] = useState('Pay $10.00'); // Example price, replace with actual data
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('Processing...');
    setIsError(false);
    try {
      const response = await axios.post(`/api/sale/${linkId}`, formData); // Pass the linkId in the URL
      if (response.data.success) {
        setMessage('Success!');
        window.location.href = response.data.redirect_url;
      } else {
        setMessage(response.data.error_message);
        setIsError(true);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    }
  };

  return (
    <Layout title="Visiting Link" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-visiting-link">
      <div id="link-content">
        <div id="header">
          <Link href="/"><h1 id="logo">Gumroad</h1></Link>
          <p>Name from User</p>
        </div>
        <div id="description-box">
          <p>Description goes here</p> {/* Replace with actual data */}
        </div>
        <form id="large-form" name="large-form" action="" method="post" onSubmit={handleFormSubmit}>
          <h3 className={isError ? 'error' : ''}>{message}</h3>
          <p>
            <label htmlFor="card_number">Card Number:</label>
            <input id="card_number" name="card_number" placeholder="Card number" type="text" value={formData.card_number} onChange={handleInputChange} />
          </p>
          <p id="expiry_p">
            <label htmlFor="date_month">Card Expiry Date:</label>
            <select id="date_month" name="expiry_month" value={formData.expiry_month} onChange={handleInputChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <span id="slash">/</span>
            <select id="date_year" name="expiry_year" value={formData.expiry_year} onChange={handleInputChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 2023} value={i + 2023}>
                  {i + 2023}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="card_security_code">Card Security Code:</label>
            <input id="card_security_code" name="card_security_code" placeholder="Security code" type="text" value={formData.card_security_code} onChange={handleInputChange} />
          </p>
          <p className="last-p"><button type="submit" id="submit_button">Pay</button></p>
          <div className="rainbow bar"></div>
        </form>
      </div>
    </Layout>
  );
};

export default VisitingLinkPage;
