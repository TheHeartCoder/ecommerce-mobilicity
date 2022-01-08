import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';
import { Toaster } from 'react-hot-toast';

import NavBar from '../components/NavBar';

import { wrapper } from '../redux/store';
import { useEffect } from 'react';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token');

      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
}
export default wrapper.withRedux(MyApp);
