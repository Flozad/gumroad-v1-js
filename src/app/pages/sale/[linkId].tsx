import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/checkoutForm';
import dotenv from 'dotenv';

dotenv.config();

const stripePromise = loadStripe("pk_test_51LoFbnDIzoRf0vqQN1smZCGcRkrsgxMF2zoScfEwMtSB8KHrdHD539ojWzlEgtV5FyFx65ErGGTF3qFxBXL1ETBx00RDQXoa4H");

const VisitingLinkPage: React.FC = () => {
  const router = useRouter();
  const { linkId } = router.query;
  const [message, setMessage] = useState('Pay $');
  const [isError, setIsError] = useState(false);
  const [linkData, setLinkData] = useState<any>(null);

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

  if (!linkData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Visiting Link" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-visiting-link">
      <div id="link-content">
        <div id="header">
          <Link href="/"><h1 id="logo">Gumroad</h1></Link>
          <p>{linkData.owner.name}</p> {/* Assuming linkData.owner contains user info */}
        </div>
        <div id="description-box">
          <p>{linkData.description}</p>
        </div>
        {linkId && (
          <Elements stripe={stripePromise}>
            <CheckoutForm linkId={linkId as string | string[]} />
          </Elements>
        )}
      </div>
    </Layout>
  );
};

export default VisitingLinkPage;
