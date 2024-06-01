/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getUserId, isAuthenticated } from '../utils/auth';

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
}) => {
  const [balance, setBalance] = useState<string>('0');
  const router = useRouter();

  useEffect(() => {
    const fetchBalance = async () => {
      if (isAuthenticated()) {
        try {
          const userId = getUserId();
          const response = await axios.get(`/api/user/${userId}?type=balance`);
          setBalance(response.data.balance);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out');
    router.push('/login');
  };

  return (
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
        <link rel="icon" href="/favicon.ico" />
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
              <Link href="/"><h1 id="logo">Gumroad</h1></Link>
              {showLoginLink ? (
                <p>Have an account? <Link href="/login" id="login-link" className="underline">Login</Link></p>
              ) : (
                loggedIn ? (
                  <p id="account-navigation">
                    {onLinksPage ? <Link href="/home">Home</Link> : <Link href="/links">Your links</Link>}
                    &bull; <span className="balance">${balance}</span> &bull; <Link href="/settings">Settings</Link> &bull; <a href="#" onClick={handleLogout}>Logout</a>
                  </p>
                ) : (
                  <p>Thanks for using Gumroad! <Link href="mailto:hi@gumroad.com">Feedback?</Link></p>
                )
              )}
              <ul id="navigation" className="hidden">
                <li><Link href="#">Tour</Link></li>
                <li><Link href="#">Examples</Link></li>
                <li><Link href="#">Sign up</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
          )}
          <div className="rule"></div>
        </div>
      </body>
    </>
  );
};

export default Header;
