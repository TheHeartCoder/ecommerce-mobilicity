import HeadText from '../components/HeadText';

const login = () => {
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
          />
          <input
            type='password'
            placeholder='Enter your password here'
            className='form-control mb-4 p-4'
          />
          <button type='submit' className='btn btn-primary btn-block'>
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default login;
