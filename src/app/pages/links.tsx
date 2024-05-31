import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const LinkPage: React.FC = () => {
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

  return (
    <Layout title="Link" hideFooter={true} hideHeader={false} showLoginLink={false} loggedIn={true} onLinksPage={false} userBalance={0} bodyId="page-link">
      <form id="large-form" action={isEditing ? `/edit/${formData.name}` : '/create'} method="post" className={isEditing ? 'editing-link' : ''} onSubmit={handleFormSubmit}>
        {isEditing ? (
          <>
            <Link to="#" id="delete_link" onClick={() => confirm("Are you sure you want to delete this link? There's no going back!")}>delete this link</Link>
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
          <label htmlFor="previewUrl">Preview URL:</label>
          <input id="previewUrl" name="previewUrl" type="text" placeholder="http://" value={formData.previewUrl} onChange={handleInputChange} />
          <div id="preview_container">
            <input type="file" id="pickpreviewfile" onChange={handleFileUpload} />
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
                <label htmlFor="downloadLimit">Download limit:</label>
                <input id="downloadLimit" name="downloadLimit" type="text" placeholder="0" value={formData.downloadLimit} onChange={handleInputChange} title="The number of people that can purchase this item. 0 means no limit!" />
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
