import HeadText from '../components/HeadText';

const register = () => {
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
          />
          <input
            type='email'
            placeholder='Enter your email here'
            className='form-control mb-4 p-4'
          />
          <input
            type='password'
            placeholder='Enter your password here'
            className='form-control mb-4 p-4'
          />
          <input
            type='text'
            placeholder='Enter your verification code here'
            className='form-control mb-4 p-4'
          />
          <button type='submit' className='btn btn-primary btn-block'>
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default register;
