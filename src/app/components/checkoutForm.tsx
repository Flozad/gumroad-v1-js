import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface CheckoutFormProps {
  linkId: string | string[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ linkId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Pay $');
  const [isError, setIsError] = useState(false);
  const [linkData, setLinkData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLinkData = async () => {
      if (!linkId) return;
      try {
        const response = await axios.get(`/api/links/${linkId}`);
        setLinkData(response.data);
        setMessage(`Pay $${response.data.price}`);
      } catch (error) {
        setIsError(true);
        setMessage('Failed to load link data.');
      }
    };
    fetchLinkData();
  }, [linkId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setMessage('Processing...');
    setIsError(false);

    try {
      const response = await axios.post('/api/create-payment-intent', { linkId });
      const { clientSecret } = response.data;

      if (!clientSecret) {
        setMessage('Failed to create payment intent.');
        setIsError(true);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setMessage('Card element not found.');
        setIsError(true);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setMessage(result.error.message || 'Payment failed');
        setIsError(true);
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          setMessage('Payment successful!');
          await axios.post('/api/send-confirmation', {
            linkId,
            amount: linkData.price,
            email: email,
          });
          router.push(`/success?linkId=${linkId}`);
        } else {
          setMessage('Payment failed');
          setIsError(true);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    }
  };

  if (!linkData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ color: isError ? 'red' : 'inherit' }}>{message}</h3>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="card_element" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Card Information:</label>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
          <CardElement id="card_element" options={{ hidePostalCode: true }} />
        </div>
        <p style={{ margin: '5px 0' }}>Use the following test card information:</p>
        <p style={{ margin: '5px 0' }}>Card number: <code>4242 4242 4242 4242</code></p>
        <p style={{ margin: '5px 0' }}>Expiry date: <code>12/34</code></p>
        <p style={{ margin: '5px 0' }}>CVC: <code>123</code></p>
        <Link href="https://docs.stripe.com/testing" target="_blank" rel="noopener noreferrer">
          <p style={{ color: '#0070f3' }}>More test card numbers</p>
        </Link>
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
