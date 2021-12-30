import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center spinner'>
      <div
        className='spinner-grow text-info'
        style={{ width: '3rem', height: '3rem' }}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
