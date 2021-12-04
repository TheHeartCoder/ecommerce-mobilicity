import HeadText from '../components/HeadText';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { registerUserAction } from '../redux/actions/auth';
import toast from 'react-hot-toast';
import { registerUser } from '../services/authService';
const register = () => {
	const router = useRouter();

	const [registerForm, setRegisterForm] = useState({
		name: '',
		email: '',
		password: '',
	});
	const loggedInUser = useSelector((state) => state.loggedInUser);
	const { userInfo } = loggedInUser;

	useEffect(() => {
		if (userInfo && userInfo.email) {
			router.push('/');
		}
	}, [userInfo]);
	// const dispatch = useDispatch();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setRegisterForm({ ...registerForm, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerUser(registerForm);
			toast.success(
				'Registration Successful. Please check your registered email inbox and follow the instruction to activate your account'
			);
			setRegisterForm({ name: '', email: '', password: '' });
		} catch (error) {
			toast.error(error);
		}
		// dispatch(registerUserAction(registerForm));
	};

	return (
		<>
			<HeadText
				headText='Register'
				subText='Feel free to register to order awesome products'
			/>
			<div className='container col-md-4 offset-md-4 card p-4'>
				<form>
					<input
						type='text'
						placeholder='Enter your name here'
						className='form-control mb-4 p-4'
						name='name'
						onChange={handleChange}
					/>
					<input
						type='email'
						placeholder='Enter your email here'
						className='form-control mb-4 p-4'
						name='email'
						onChange={handleChange}
					/>
					<input
						type='password'
						placeholder='Enter your password here'
						className='form-control mb-4 p-4'
						name='password'
						onChange={handleChange}
					/>
					<button
						type='submit'
						className='btn btn-primary btn-block'
						onClick={handleSubmit}
					>
						Register
					</button>
				</form>
			</div>
		</>
	);
};
export default register;
