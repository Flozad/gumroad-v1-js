import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '../assets/css/style.css';

const Router = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Router>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;
