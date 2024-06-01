/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { ILink } from '../models/Link';
import { isAuthenticated, getUserId } from '../utils/auth';

const LinksPage: React.FC = () => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userId = getUserId();
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setShowError(true);
          setErrorMessage('Failed to fetch data');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const userId = getUserId();
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchLinks = async () => {
      try {
        const response = await fetch(`/api/user/${userId}?type=links`);
        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        } else {
          setShowError(true);
          setErrorMessage('Failed to fetch links');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    };

    fetchLinks();
  }, [router]);

  const handleDelete = async (linkId: string) => {
    if (confirm("Are you sure you want to delete this link? There's no going back!")) {
      try {
        const response = await fetch(`/api/links/${linkId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setLinks(links.filter(link => link._id !== linkId));
        } else {
          setShowError(true);
          setErrorMessage('Failed to delete link');
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  if (!data) return <div>Loading...</div>;


  return (
    <Layout title="Links" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={true} userBalance={data.balance} bodyId="page-links">
      <div id="links-management">
        <h3>Your Links</h3>
        {showError && <small className="error">{errorMessage}</small>}
        <div>
          <button onClick={() => router.push('/link')} style={{ padding: '10px 20px', backgroundColor: '#EB6841', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Create Link</button>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link._id}>
              <h4>{link.name}</h4>
              <p>Price: ${link.price}</p>
              <p>URL: <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></p>
              <p>Preview URL: <a href={link.preview_url} target="_blank" rel="noopener noreferrer">{link.preview_url}</a></p>
              <p>Description: {link.description}</p>
              <p>Downloads: {link.number_of_downloads}</p>
              <p>Views: {link.number_of_views}</p>
              <button onClick={() => router.push(`/link/${link._id}`)} style={{ padding: '5px 10px', backgroundColor: '#EB6841', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(link._id)} style={{ padding: '5px 10px', backgroundColor: '#CC333F', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default LinksPage;
