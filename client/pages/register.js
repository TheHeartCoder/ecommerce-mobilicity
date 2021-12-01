import HeadText from '../components/HeadText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { registerUserAction } from '../redux/actions/auth';
const register = () => {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.token) {
      router.push('/');
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAction(registerForm));
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
