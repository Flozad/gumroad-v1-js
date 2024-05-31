import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';


const Index: React.FC = () => {
  const showError = false;
  const errorMessage = "Some error message";
  const emailAddress = "john@example.com";

  return (
    <Layout title="Home" hideFooter={true} hideHeader={true} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-home">
      <div id="intro">
        <div id="video"></div>
        <ul>
          <li id="we-handle-payments">
            <h5>We handle all the payment stuff.</h5>
            <p>You should be focused on creating awesome content. We&apos;ll deal with the rest.</p>
          </li>
          <li id="worldwide">
            <h5>Do what you already do.</h5>
            <p>Use the channels you already have with your fans and followers. You <em>are</em> the distribution. No store needed.</p>
          </li>
        </ul>
        <div id="intro-text">
          <h2>Share and sell your digital content <br />with just a link.</h2>
          <p id="description">Selling stuff has always been a pain. No longer! Get back to creating. <br />We make selling stuff as easy as sharing a link.</p>
        </div>
        <form id="large-form" action="/" method="post">
          {showError ? (
            <h3>Sign up for Gumroad <small className="error">{errorMessage}</small></h3>
          ) : (
            <h3>Sign up for Gumroad <small>Fill in the simple form below and start selling in minutes</small></h3>
          )}
          <p>
            <input type="text" placeholder="Email Address" name="email" value={emailAddress} />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Start selling!</button>
          </p>
          <div className="rainbow bar"></div>
        </form>
      </div>
      <div id="press">
        <div className="testimonial">
          <blockquote>“Incredibly easy… in fact, just writing this, I&apos;m coming up with ideas and kicking myself for having not sold things in the past. Fortunately, moving forward, I won&apos;t have to kick myself anymore.”</blockquote>
          <span className="writer">Brad McCarty  - <Link to="http://thenextweb.com/apps/2011/04/09/gumroad-sell-digital-goods-with-a-link-no-storefront-needed/">The Next Web</Link></span>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
