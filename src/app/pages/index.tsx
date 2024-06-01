import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Index: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/links');
      } else {
        const data = await response.json();
        setShowError(true);
        setErrorMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('An unexpected error occurred');
    }
  };

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
        <form id="large-form" action="/" method="post" onSubmit={handleSubmit}>
          {showError ? (
            <h3>Sign up for Gumroad <small className="error">{errorMessage}</small></h3>
          ) : (
            <h3>Sign up for Gumroad <small>Fill in the simple form below and start selling in minutes</small></h3>
          )}
          <p>
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Start selling!</button>
          </p>
          <p>Already have an account? <Link href="/login">Login in here</Link></p>

          <div className="rainbow bar"></div>
        </form>
      </div>
      <div id="press">
        <div className="testimonial">
          <blockquote>“Incredibly easy… in fact, just writing this, I&apos;m coming up with ideas and kicking myself for having not sold things in the past. Fortunately, moving forward, I won&apos;t have to kick myself anymore.”</blockquote>
          <span className="writer">Brad McCarty  - <Link href="http://thenextweb.com/apps/2011/04/09/gumroad-sell-digital-goods-with-a-link-no-storefront-needed/">The Next Web</Link></span>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
