import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
const About: React.FC = () => (
  <Layout title="About" hideFooter={false} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-about">
    <div id="main-content">
      <h3>Gumroad lets you sell just like you share.</h3>
      <div className="mini-rule"></div>
      <p>We want to democratize the ability to sell stuff online. You&apos;re a creative person; you create a lot of content. But most of it, you never sell! It&apos;s either too hard, or too time-consuming, or it doesn&apos;t even make sense to put in a store!</p>
      <p>We let you easily sell the stuff you weren&apos;t able to before. It turns out, that includes a lot of stuff.</p>
      <p>We&apos;re early in the process of changing the world and all that fun stuff, but we&apos;re <Link href="mailto:hi@gumroad.com">always looking for help</Link>.</p>
    </div>
  </Layout>
);

export default About;
