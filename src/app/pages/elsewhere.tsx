import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
const Elsewhere: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
  <Layout title="Elsewhere" hideFooter={false} hideHeader={false} showLoginLink={false} loggedIn={false} onLinksPage={false} userBalance={0} bodyId="page-elsewhere">
    <div id="main-content">
      <h3>Gumroad for WordPress.</h3>
      <div className="mini-rule"></div>
      <h4>You can use Gumroad with your WordPress blog.</h4>
      <p>Download <Link href="/downloads/gumroad.zip">Gumroad for WordPress</Link>, unzip it, and drag it into your wp-content/plugins/ folder. Then, update your Gumroad (under Settings) account details in your WP Admin dashboard.</p>
      <p>That&apos;s it! Just use the gumroad shortcode in your blog posts and it&apos;ll automatically convert into a Gumroad link. For example, this:</p>
      <p><pre>[gumroad name=&quot;name&quot; url=&quot;http://google.com&quot; price=&quot;5.00&quot; description=&quot;description&quot;]anchor text[/gumroad]</pre></p>
      <p>turns into this:</p>
      <p><pre>&lt;a href=&quot;http://gumroad.com/l/tsdylq&quot;&gt;anchor text&lt;/a&gt;</pre></p>
      <p>That&apos;s it!</p>
    </div>
  </Layout>
)
}

export default Elsewhere;
