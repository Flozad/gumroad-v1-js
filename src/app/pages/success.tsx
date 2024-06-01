import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const { linkId } = router.query;

  const [sellerName, setSellerName] = useState("");
  const [linkData, setLinkData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchLinkData = async () => {
      if (!linkId) return;
      try {
        const response = await axios.get(`/api/link/${linkId}`);
        setLinkData(response.data);

        if (response.data.owner) {
          setUserId(response.data.owner);
        }
      } catch (error) {
        setIsError(true);
        setMessage('Failed to load link data.');
      }
    };
    fetchLinkData();
  }, [linkId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/user/${userId}`)
        .then((response) => {
          setSellerName(response.data.name);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <Layout
      title="Thank You"
      hideFooter={true}
      hideHeader={true}
      showLoginLink={false}
      loggedIn={false}
      onLinksPage={false}
      userBalance={0}
      bodyId="page-success"
    >
      {linkData && (
        <div id="success-content">
          <h1>Thank You for Your Purchase!</h1>
          <p>Your purchase of ${linkData.price} has been successfully completed.</p>
          <p>Seller: {sellerName}</p>
          <p>
            <a href={formatUrl(linkData.url)} target="_blank" rel="noopener noreferrer">
              Go to the purchased link
            </a>
          </p>
          {isError && <p className="error">{message}</p>}
        </div>
      )}
    </Layout>
  );
};

export default SuccessPage;
