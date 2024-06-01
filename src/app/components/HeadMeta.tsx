/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Head from 'next/head';

interface HeadMetaProps {
  title?: string;
}

const HeadMeta: React.FC<HeadMetaProps> = ({ title }) => (
  <Head>
    <title>{title ? title : 'Gumroad - Selling should be as easy as sharing a link.'}</title>
    <meta property="og:site_name" content="Gumroad" />
    <meta property="og:title" content="Gumroad" />
    <link rel="icon" href="./favicon.ico" />
    <meta property="og:url" content="http://gumroad.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Selling should be as easy as sharing a link." />
    <meta property="fb:page_id" content="http://www.facebook.com/gumroad" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
    <script src="/static/js/fileuploader.js" type="text/javascript"></script>
    <script src="/static/js/jquery.tipsy.js" type="text/javascript"></script>
    <script src="/static/js/jquery.backgroundPosition.js" type="text/javascript"></script>
    <script src="/static/plupload/gears_init.js"></script>
    <script src="/static/plupload/plupload.full.min.js"></script>
    <script src="/static/js/app.js"></script>
    <script>
      {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-3109196-41');`}
    </script>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  </Head>
);

export default HeadMeta;
