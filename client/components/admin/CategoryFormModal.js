import { Modal, Rate } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import toast from 'react-hot-toast';
import axios from 'axios';
const CategoryFormModal = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [imageLoading, setImageLoading] = useState(false);
  const [tempImage, setTempImage] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (imageUrl) => {
      //   setImageLoading(false);
      //   setTempImage(imageUrl);
      // });
      console.log(info.file.originFileObj);
      // resize
      Resizer.imageFileResizer(
        info.file.originFileObj,
        450,
        370,
        'JPEG',
        100,
        0,
        async (uri) => {
          console.log(uri);
          try {
            let { data } = await axios.post('/api/image-upload', {
              image: uri,
            });
            console.log('IMAGE UPLOADED', data);
            // set image in the state
            // setImage(data);
            // setValues({ ...values, loading: false });
          } catch (err) {
            console.log(err);
            // setValues({ ...values, loading: false });
            toast.error('Image upload failed. Try later.');
          }
        }
      );
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal
      title='Add Your Product Category'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Save'
    >
      <input className='form-control mb-2 p-2' placeholder='Category title' />
      <textarea
        className='form-control p-2 mb-2'
        placeholder='Small Description'
      ></textarea>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {tempImage ? (
          <img src={tempImage} alt='avatar' style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <button className='btn btn-dark'>Upload Image</button>
    </Modal>
  );
};

export default CategoryFormModal;
