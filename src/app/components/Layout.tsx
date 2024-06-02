import React from "react";
import Footer from "./Footer";
import HeadMeta from "./HeadMeta";
import Link from 'next/link'
import router from "next/router";
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  title: string;
  hideFooter: boolean;
  hideHeader: boolean;
  showLoginLink: boolean;
  loggedIn: boolean;
  onLinksPage: boolean;
  userBalance: number;
  bodyId: string;
  children: React.ReactNode;
}

const handleLogout = () => {
  localStorage.removeItem('token');
  console.log('Logged out');
  router.push('/login');
};

const Layout: React.FC<LayoutProps> = ({
  title,
  hideFooter,
  hideHeader,
  showLoginLink,
  loggedIn,
  onLinksPage,
  userBalance,
  bodyId,
  children,
}) => (
  <html>
    <div>
      <HeadMeta title={title} />
      <body id={bodyId ? bodyId : undefined}>
        <div className="top-bar"></div>
        <div id="loading-indicator">Loading...</div>
        <div id="wrapper">
          {!hideHeader && (
            <div id="header">
              <Link href="/">
                <h1 id="logo">Gumroad</h1>
              </Link>
              {showLoginLink ? (
                <p>
                  Have an account?{" "}
                  <Link href="/login" id="login-link" className="underline">
                    Login
                  </Link>
                </p>
              ) : loggedIn ? (
                <p id="account-navigation">
                  {onLinksPage ? (
                    <Link href="/home">Home</Link>
                  ) : (
                    <Link href="/links">Your links</Link>
                  )}
                  &bull; <span className="balance">${userBalance}</span> &bull;{" "}
                  <Link href="/settings">Settings</Link> &bull;{" "}
                  <Link onClick={handleLogout} href="/login"
                  >Logout</Link>
                </p>
              ) : (
                <p>
                  Thanks for using Gumroad!{" "}
                  <Link href="mailto:hi@gumroad.com">Feedback?</Link>
                </p>
              )}
              <ul id="navigation" className="hidden">
                <li>
                  <Link href="#">Tour</Link>
                </li>
                <li>
                  <Link href="#">Examples</Link>
                </li>
                <li>
                  <Link href="#">Sign up</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
              </ul>
            </div>
          )}
          <div className="rule"></div>
          {children}
        </div>
        <Footer hideFooter={hideFooter} />
        <Analytics />
      </body>
    </div>
  </html>
);

export default Layout;
