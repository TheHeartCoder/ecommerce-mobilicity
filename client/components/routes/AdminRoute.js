import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import NavBar from '../NavBar';

const AdminRoute = ({ children }) => {
	const [ok, setOk] = useState(false);
	const router = useRouter();
	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const { data } = await axios.get('/api/current-admin');
			//   console.log(data);
			if (data.ok) setOk(true);
		} catch (err) {
			console.log(err);
			setOk(false);
			router.push('/login');
		}
	};
	return (
		<>
			{!ok ? (
				<SyncOutlined
					spin
					className='d-flex justify-content-center display-1 text-primary p-5'
				/>
			) : (
				<div>{children}</div>
			)}
		</>
	);
};

export default AdminRoute;
