import React from 'react';
import Copyright from './Copyright';
import { Link } from 'react-router-dom';
interface FooterProps {
  hideFooter?: boolean;
}

const Footer: React.FC<FooterProps> = ({ hideFooter }) => {
  if (hideFooter) return null;

  return (
    <div>
      <div id="push"></div>
      <div id="footer">
        <div id="inner-footer">
          <Copyright />
          <p id="footer-navigation">
            <Link to="/about">About</Link> &bull;
            <Link to="/faq">FAQ</Link> &bull;
            <Link to="http://twitter.com/gumroad/">Twitter</Link> &bull;
            <Link to="http://facebook.com/gumroad/">Facebook</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
