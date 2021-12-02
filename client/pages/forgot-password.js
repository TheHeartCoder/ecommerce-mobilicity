import { LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import HeadText from '../components/HeadText';
import { forgotPassword, resetPassword } from '../services/authService';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const [forgorPasswordForm, setForgotpasswordForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();
  useEffect(() => {
    if (userInfo && userInfo.email) {
      router.push('/');
    }
  }, [userInfo]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgotpasswordForm({ ...forgorPasswordForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (success) {
        if (
          !forgorPasswordForm?.email ||
          !forgorPasswordForm?.otp ||
          !forgorPasswordForm?.newPassword
        ) {
          toast.error('Please fill all required fields');
          return;
        }
        setLoading(true);
        await resetPassword(forgorPasswordForm);
        setLoading(false);
        toast.success('Password reset successfully');
        router.push('/login');
      } else {
        if (!forgorPasswordForm?.email) {
          toast.error('Please give your email');
          return;
        }
        setLoading(true);
        await forgotPassword(forgorPasswordForm?.email);
        setSuccess(true);
        setLoading(false);
        toast.success('OTP sent to your email. Please check your mail inbox');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <>
      <HeadText
        headText='Forgot Password'
        subText='Reset your password from here'
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
          {success && (
            <>
              <input
                type='password'
                placeholder='Enter OTP'
                className='form-control mb-4 p-4'
                name='otp'
                onChange={handleChange}
              />
              <input
                type='password'
                placeholder='Enter your new password'
                className='form-control mb-4 p-4'
                name='newPassword'
                onChange={handleChange}
              />
            </>
          )}

          <button
            type='submit'
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
          >
            {loading ? <LoadingOutlined /> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
