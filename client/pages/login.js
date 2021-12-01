import HeadText from '../components/HeadText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { loginUserAction } from '../redux/actions/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { activateUser } from '../services/authService';

const login = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [activationLoading, setActivationLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const userInfo = useSelector((state) => state.userLogin);

  const activationId = router.query.activation;

  useEffect(() => {
    if (userInfo && userInfo.token) {
      router.push('/');
    }

    if (activationId) {
      activateAccount();
    }
  }, [userInfo, activationId]);

  const activateAccount = async () => {
    try {
      setActivationLoading(true);
      await activateUser(activationId);
      toast.success('Your account got activated. Now you can login');
      setActivationLoading(false);
      router.push('/login');
    } catch (error) {
      console.error(error);
      setActivationLoading(false);
      toast.error(error);
      router.push('/login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(loginForm));
  };

  return (
    <>
      <HeadText
        headText='Log In'
        subText='Login to order your favourite products'
      />
      <div className='container col-md-4 offset-md-4 card p-4'>
        <form>
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
            name='password'
            className='form-control mb-4 p-4'
            onChange={handleChange}
          />
          <button
            type='submit'
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
            disabled={activationLoading}
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default login;
