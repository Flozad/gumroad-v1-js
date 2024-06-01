/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

  useEffect(() => {
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
  }, [linkId]);

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

  return (
    <Layout title="Edit Link" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={0} bodyId="page-edit-link">
      <form id="large-form" method="post" className="editing-link" onSubmit={handleFormSubmit}>
        <Link href="#" id="delete_link" onClick={() => confirm("Are you sure you want to delete this link? There's no going back!")}>delete this link</Link>
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
    </Layout>
  );
};

export default LinkEditPage;
