/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Head from 'next/head';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  bodyId?: string;
  hideHeader?: boolean;
  showLoginLink?: boolean;
  loggedIn?: boolean;
  onLinksPage?: boolean;
  userBalance?: string;
}

const Header: React.FC<HeaderProps> = ({
  title, bodyId, hideHeader, showLoginLink, loggedIn, onLinksPage, userBalance
}) => (
  <>
    <Head>
      <title>{title ? title : 'Gumroad - Selling should be as easy as sharing a link.'}</title>
      <meta property="og:site_name" content="Gumroad" />
      <meta property="og:title" content="Gumroad" />
      <meta property="og:url" content="http://gumroad.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Selling should be as easy as sharing a link." />
      <meta property="fb:page_id" content="http://www.facebook.com/gumroad" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
      <script src="./static/js/fileuploader.js" type="text/javascript"></script>
      <script src="./static/js/jquery.tipsy.js" type="text/javascript"></script>
      <script src="./static/js/jquery.backgroundPosition.js" type="text/javascript"></script>
      <script src="./static/plupload/gears_init.js"></script>
      <script src="./static/plupload/plupload.full.min.js"></script>
      <script src="./static/js/app.js"></script>
      <script>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-3109196-41');`}
      </script>
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    </Head>
    <body id={bodyId ? bodyId : undefined}>
      <div className="top-bar"></div>
      <div id="loading-indicator">Loading...</div>
      <div id="wrapper">
        {!hideHeader && (
          <div id="header">
            <Link to="/"><h1 id="logo">Gumroad</h1></Link>
            {showLoginLink ? (
              <p>Have an account? <Link to="/login" id="login-link" className="underline">Login</Link></p>
            ) : (
              loggedIn ? (
                <p id="account-navigation">
                  {onLinksPage ? <Link to="/home">Home</Link> : <Link to="/links">Your links</Link>}
                  &bull; <span className="balance">${userBalance}</span> &bull; <Link to="/settings">Settings</Link> &bull; <Link to="/logout">Logout</Link>
                </p>
              ) : (
                <p>Thanks for using Gumroad! <Link to="mailto:hi@gumroad.com">Feedback?</Link></p>
              )
            )}
            <ul id="navigation" className="hidden">
              <li><Link to="#">Tour</Link></li>
              <li><Link to="#">Examples</Link></li>
              <li><Link to="#">Sign up</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
        )}
        <div className="rule"></div>
      </div>
    </body>
  </>
);

export default Header;
