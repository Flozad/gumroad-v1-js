/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Link } from 'react-router-dom';

const LinkPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    url: '',
    previewUrl: '',
    description: '',
    downloadLimit: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [linkToShare, setLinkToShare] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [views, setViews] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [numberOfDownloads, setNumberOfDownloads] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add file upload logic here
  };

  const handlePreviewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add preview file upload logic here
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
    <Layout title="Link" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={0} bodyId="page-link">
      {isEditing && (
        <div id="share-box">
          <Link to={`http://www.facebook.com/dialog/feed?app_id=114816261931958&redirect_uri=http://gumroad.com/home&display=popup&message=Buy%20${encodeURIComponent(formData.name)}%20on%20Gumroad%21&link=${encodeURIComponent(linkToShare)}`} className="facebook button">
            Share on Facebook
          </Link>
          <p>
            <input type="text" value={linkToShare} id="link_to_share" readOnly title="Share this link to sell!" onClick={(e) => (e.target as HTMLInputElement).select()} />
          </p>
          <Link to={`http://twitter.com/share?text=Buy%20${encodeURIComponent(formData.name)}%20on%20Gumroad%21&via=gumroad&url=${encodeURIComponent(linkToShare)}`} className="twitter button" onClick={() => popup(linkToShare)}>
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
      )}

      <form id="large-form" action={isEditing ? `/edit/${router.query.permalink}` : '/create'} method="post" className={isEditing ? 'editing-link' : ''} onSubmit={handleFormSubmit}>
        {isEditing ? (
          <>
            <Link to="#" id="delete_link" onClick={showConfirm}>delete this link</Link>
            <h3>Edit link {showError && <small className="error">{errorMessage}</small>}</h3>
          </>
        ) : (
          <h3>Create a new link {showError && <small className="error">{errorMessage}</small>}</h3>
        )}

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
            <input type="file" id="pickfile" onChange={handleFileUpload} />
          </div>
        </p>
        <p>
          <label htmlFor="preview_url">Preview URL:</label>
          <input id="preview_url" name="previewUrl" type="text" placeholder="http://" value={formData.previewUrl} onChange={handleInputChange} />
          <div id="preview_container">
            <input type="file" id="pickpreviewfile" onChange={handlePreviewFileUpload} />
          </div>
        </p>
        <p>
          <label htmlFor="description">Description:<br /><span className="faint">(optional)</span></label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
        </p>

        <p><button type="submit">{isEditing ? 'Save changes' : 'Add link'}</button></p>

        {isEditing && (
          <>
            <div className="mini-rule"></div>
            <div id="link-options">
              <h4>Additional link options:</h4>
              <p>
                <label htmlFor="download_limit">Download limit:</label>
                <input id="download_limit" name="downloadLimit" type="text" placeholder="0" value={formData.downloadLimit} onChange={handleInputChange} title="The number of people that can purchase this item. 0 means no limit!" />
              </p>
            </div>
          </>
        )}

        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </Layout>
  );
};

export default LinkPage;
