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
  addBanner,
  getBanners,
  updateBanner,
} from '../../redux/actions/banner';

const bannerDetailsInit = { link: '', image: {} };
const BannerFormModal = ({
  isModalVisible,
  setIsModalVisible,
  loading,
  success,
  currentSlug,
  banners,
  setCurrentSlug,
}) => {
  const [bannerDetails, setBannerDetails] = useState(bannerDetailsInit);
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isModalVisible) {
      setImageLoading(false);
      setCurrentSlug(null);
      setBannerDetails(bannerDetailsInit);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (success) {
      setIsModalVisible(false);
      dispatch(getBanners());
    }
  }, [success]);

  useEffect(() => {
    if (currentSlug) {
      const banner = banners.find((c) => c.slug === currentSlug);

      setBannerDetails(...bannerDetails, ...banner);
      setIsModalVisible(true);
    }
  }, [currentSlug]);

  const handleOk = () => {
    if (imageLoading || loading) {
      return false;
    }
    if (!bannerDetails.link || !bannerDetails.image?.Location) {
      toast.error('Please fill all the fields');
      return;
    }

    if (currentSlug) {
      dispatch(updateBanner(currentSlug, bannerDetails));
    } else {
      dispatch(addBanner(bannerDetails));
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
      if (bannerDetails?.image) {
        toast.error('Please delete previuos image before uploading new one');
        return;
      }
      // resize
      Resizer.imageFileResizer(
        info.file.originFileObj,
        1200,
        500,
        'JPEG',
        100,
        0,
        async (uri) => {
          try {
            const uploadedImage = await imageUploadToServer(uri);

            setBannerDetails({ ...bannerDetails, image: uploadedImage });
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
      const response = await removeImageFromServer(bannerDetails.image);

      setBannerDetails({ ...bannerDetails, image: {} });
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
      title='Add Your Banner'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Save'
    >
      <input
        type='text'
        className='form-control mb-2 p-2'
        placeholder='Banner Link'
        onChange={(e) =>
          setBannerDetails({ ...bannerDetails, link: e.target.value })
        }
      />
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        uploadButton
      </Upload>
      <button className='btn btn-sm btn-danger' onClick={removeImage}>
        Delete Image
      </button>
    </Modal>
  );
};

export default BannerFormModal;
