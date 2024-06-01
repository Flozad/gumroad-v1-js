/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getUserId } from '../utils/auth';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LinkEditPage: React.FC = () => {
  const router = useRouter();
  const { linkId } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    url: '',
    previewUrl: '',
    description: '',
    downloadLimit: '',
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [linkToShare, setLinkToShare] = useState('');
  const [views, setViews] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [numberOfDownloads, setNumberOfDownloads] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId();
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setShowError(true);
          setErrorMessage('Failed to fetch user data');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    };

    const fetchLink = async () => {
      try {
        const response = await fetch(`/api/links/${linkId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            price: data.price,
            url: data.url,
            previewUrl: data.preview_url,
            description: data.description,
            downloadLimit: data.download_limit,
          });
          setViews(data.views);
          setNumberOfDownloads(data.downloads);
          setPrice(data.price);
          setTotalProfit(data.totalProfit);
          setLinkToShare(data.unique_permalink);
          setChartData({
            labels: Object.keys(data.groupedPurchases),
            datasets: [
              {
                label: 'Purchases',
                data: Object.values(data.groupedPurchases),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                fill: true,
                tension: 0.4
              }
            ]
          });
        } else {
          setShowError(true);
          setErrorMessage('Failed to fetch link details');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    };

    if (linkId) fetchLink();
    if (!user) fetchUser();
  }, [linkId, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch(`/api/links/${linkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/links');
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

  const showConfirm = () => {
    if (confirm("Are you sure you want to delete this link? There's no going back!")) {
      // Add delete logic here
    }
  };

  const popup = (url: string) => {
    window.open(url, 'Share on Twitter', 'height=150,width=550');
  };

  return (
    <Layout title="Edit Link" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={user ? user.balance : 0} bodyId="page-edit-link">
      <div id="share-box">
        <Link href={`http://www.facebook.com/dialog/feed?app_id=114816261931958&redirect_uri=http://gumroad.com/home&display=popup&message=Buy%20${encodeURIComponent(formData.name)}%20on%20Gumroad%21&link=${encodeURIComponent(linkToShare)}`} className="facebook button">
          Share on Facebook
        </Link>
        <p>
          <input type="text" value={linkToShare} id="link_to_share" readOnly title="Share this link to sell!" onClick={(e) => (e.target as HTMLInputElement).select()} />
        </p>
        <Link href={`http://twitter.com/share?text=Buy%20${encodeURIComponent(formData.name)}%20on%20Gumroad%21&via=gumroad&url=${encodeURIComponent(linkToShare)}`} className="twitter button" onClick={() => popup(linkToShare)}>
          Share on Twitter
        </Link>

        <div id="analytics-box">
          <p>
            <strong>{views}</strong> views <span className="arrow">→</span>{' '}
            <img
              src={`https://chart.googleapis.com/chart?chf=bg,s,00000000&cht=p&chd=t:${conversion},${100 - conversion}&chds=0,100&chs=100x100&chco=797874,79787420`}
              height="20"
              width="20"
              alt="conversion chart"
            />{' '}
            <span>{conversion}%</span> <span className="arrow">→</span> <strong>{numberOfDownloads}</strong> downloads at ≈ <strong>{price}</strong> <span className="arrow">→</span> <strong>{totalProfit}</strong> in profit!
          </p>
        </div>
      </div>
      <form id="large-form" method="post" className="editing-link" onSubmit={handleFormSubmit}>
        <Link href="#" id="delete_link" onClick={showConfirm}>delete this link</Link>
        <h3>Edit link {showError && <small className="error">{errorMessage}</small>}</h3>
        <p>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" placeholder="name" value={formData.name} onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="price">Price:</label>
          <input id="price" name="price" type="text" placeholder="$10" value={formData.price} onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="url">URL:</label>
          <input id="url" name="url" type="text" placeholder="http://" value={formData.url} onChange={handleInputChange} />
          <div id="container">
            <input type="file" id="pickfile" onChange={() => { /* Add file upload logic here */ }} />
          </div>
        </p>
        <p>
          <label htmlFor="previewUrl">Preview URL:</label>
          <input id="previewUrl" name="previewUrl" type="text" placeholder="http://" value={formData.previewUrl} onChange={handleInputChange} />
          <div id="preview_container">
            <input type="file" id="pickpreviewfile" onChange={() => { /* Add preview file upload logic here */ }} />
          </div>
        </p>
        <p>
          <label htmlFor="description">Description:<br /><span className="faint">(optional)</span></label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
        </p>
        <p><button type="submit">Save changes</button></p>
        <div className="mini-rule"></div>
        <div id="link-options">
          <h4>Additional link options:</h4>
          <p>
            <label htmlFor="downloadLimit">Download limit:</label>
            <input id="downloadLimit" name="downloadLimit" type="text" placeholder="0" value={formData.downloadLimit} onChange={handleInputChange} title="The number of people that can purchase this item. 0 means no limit!" />
          </p>
        </div>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
      {chartData && (
        <div className="chart">
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Purchases Over Time'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Amount'
                }
              }
            }
          }} />
        </div>
      )}
    </Layout>
  );
};

export default LinkEditPage;
