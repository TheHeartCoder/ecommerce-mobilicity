import { Modal } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import {
  imageUploadToServer,
  removeImageFromServer,
} from '../../services/imageService';
import {
  addCategory,
  getCategories,
  updateCategory,
} from '../../redux/actions/categories';

const CategoryFormModal = ({
  isModalVisible,
  setIsModalVisible,
  loading,
  success,
  currentSlug,
  categories,
  setCurrentSlug,
}) => {
  const [catData, setCatData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isModalVisible) {
      setImageLoading(false);
      setCurrentSlug(null);
      setCatData({
        title: '',
        description: '',
        image: '',
      });
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (success) {
      setIsModalVisible(false);
      dispatch(getCategories(1));
    }
  }, [success]);

  useEffect(() => {
    if (currentSlug) {
      const category = categories.find((c) => c.slug === currentSlug);

      setCatData({
        title: category.title,
        description: category.description,
        image: category.image,
      });
      setIsModalVisible(true);
    }
  }, [currentSlug]);

  const handleOk = () => {
    if (imageLoading || loading) {
      return false;
    }
    if (!catData.title || !catData.description || !catData.image) {
      toast.error('Please fill all the fields');
      return;
    }

    if (currentSlug) {
      dispatch(updateCategory(currentSlug, catData));
    } else {
      dispatch(addCategory(catData));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (catData?.image) {
        toast.error('Please delete previuos image before uploading new one');
        return;
      }
      // resize
      Resizer.imageFileResizer(
        info.file.originFileObj,
        400,
        500,
        'JPEG',
        100,
        0,
        async (uri) => {
          try {
            const uploadedImage = await imageUploadToServer(uri);

            setCatData({ ...catData, image: uploadedImage });
            setImageLoading(false);
            toast.success('Image Uploaded Successfully');
          } catch (err) {
            toast.error('Image upload failed. Try later.');
          }
        }
      );
    }
  };

  const removeImage = async () => {
    try {
      if (!catData.image?.Location) {
        toast.error('No image to remove');
        return;
      }
      const response = await removeImageFromServer(catData.image);

      setCatData({ ...catData, image: '' });
      toast.success('Image removed successfully');
    } catch (error) {
      toast.error('Image remove failed. Try later.');
    }
  };

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
      okText={loading ? 'Loading...' : 'Save'}
    >
      <input
        className='form-control mb-2 p-2'
        placeholder='Category title'
        value={catData.title}
        onChange={(e) => setCatData({ ...catData, title: e.target.value })}
      />
      <textarea
        className='form-control p-2 mb-2'
        placeholder='Small Description'
        value={catData.description}
        onChange={(e) =>
          setCatData({ ...catData, description: e.target.value })
        }
        maxLength='150'
      ></textarea>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {catData.image?.Location ? (
          <img
            src={catData.image?.Location}
            alt='avatar'
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <button className='btn btn-sm btn-danger' onClick={removeImage}>
        Delete Image
      </button>
    </Modal>
  );
};

export default CategoryFormModal;
