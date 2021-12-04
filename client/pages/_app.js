import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';
import { Toaster } from 'react-hot-toast';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { useRouter } from 'next/router';
import { wrapper } from '../redux/store';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axios.get('/api/csrf-token');
			// console.log("CSRF", data);
			axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
		};
		getCsrfToken();
	}, []);

	const loggedInUser = useSelector((state) => state.loggedInUser);
	let updatedPageProps = { ...pageProps, loggedInUser };

	return (
		<>
			<NavBar loggedInUser={loggedInUser} />
			<Component {...updatedPageProps} /> <Footer />
			<Toaster position='top-center' reverseOrder={false} />
		</>
	);
}
export default wrapper.withRedux(MyApp);
