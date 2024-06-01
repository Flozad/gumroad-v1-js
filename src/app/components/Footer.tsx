import React from 'react';
import Copyright from './Copyright';
import Link from 'next/link'

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
            <Link href="/about">About</Link> &bull;
            <Link href="/faq">FAQ</Link> &bull;
            <Link href="http://twitter.com/gumroad/">Twitter</Link> &bull;
            <Link href="http://facebook.com/gumroad/">Facebook</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
