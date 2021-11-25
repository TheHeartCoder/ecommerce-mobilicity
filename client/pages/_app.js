import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log();
  return (
    <>
      <NavBar />
      <Component {...pageProps} /> <Footer />
    </>
  );
}
export default MyApp;
