import React from "react";
import Footer from "./Footer";
import HeadMeta from "./HeadMeta";
import { Link } from 'react-router-dom';

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
              <Link to="/">
                <h1 id="logo">Gumroad</h1>
              </Link>
              {showLoginLink ? (
                <p>
                  Have an account?{" "}
                  <Link to="/login" id="login-link" className="underline">
                    Login
                  </Link>
                </p>
              ) : loggedIn ? (
                <p id="account-navigation">
                  {onLinksPage ? (
                    <Link to="/home">Home</Link>
                  ) : (
                    <Link to="/links">Your links</Link>
                  )}
                  &bull; <span className="balance">${userBalance}</span> &bull;{" "}
                  <Link to="/settings">Settings</Link> &bull;{" "}
                  <Link to="/logout">Logout</Link>
                </p>
              ) : (
                <p>
                  Thanks for using Gumroad!{" "}
                  <Link to="mailto:hi@gumroad.com">Feedback?</Link>
                </p>
              )}
              <ul id="navigation" className="hidden">
                <li>
                  <Link to="#">Tour</Link>
                </li>
                <li>
                  <Link to="#">Examples</Link>
                </li>
                <li>
                  <Link to="#">Sign up</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
              </ul>
            </div>
          )}
          <div className="rule"></div>
          {children}
        </div>
        <Footer hideFooter={hideFooter} />
      </body>
    </div>
  </html>
);

export default Layout;
