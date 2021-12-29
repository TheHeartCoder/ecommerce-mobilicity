import { Button, Modal, Space } from 'antd';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import {
  imageUploadToServer,
  removeImageFromServer,
} from '../../services/imageService';
import Resizer from 'react-image-file-resizer';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categories';
import { getBrands } from '../../redux/actions/brand';
import {
  addProduct,
  getProducts,
  updateProduct,
} from '../../redux/actions/products';
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const allImage = [];
const initialState = {
  name: '',
  color: '',
  category: '',
  brand: '',
  highlightDescription: '',
  description: '',
  price: '',
  featured: false,
  quantity: '',
  images: [],
};

const ProductFormModal = ({
  isModalVisible,
  setIsModalVisible,
  loading,
  success,
  currentSlug,
  products,
  setCurrentSlug,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const categoriesData = useSelector((state) => state.categoryData);
  const { categories } = categoriesData;

  const brandData = useSelector((state) => state.brandData);
  const { brands } = brandData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }

    if (!brands) {
      dispatch(getBrands());
    }
  }, []);

  // handle Images from antd

  const [productData, setProductData] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (!isModalVisible) {
      setImageLoading(false);
      setCurrentSlug(null);
      setProductData(initialState);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (success) {
      setIsModalVisible(false);
      dispatch(getProducts(1));
    }
  }, [success]);

  useEffect(() => {
    if (currentSlug) {
      const product = products.find((c) => c.slug === currentSlug);

      setProductData({ ...productData, ...product });
      setIsModalVisible(true);
    }
  }, [currentSlug]);

  const handleImgChange = async (e) => {
    try {
      if (allImage.length >= 3) {
        toast.error('You can only upload 3 images');
        return;
      }
      setImageLoading(true);

      for (var i = 0; i < e.target.files.length; i++) {
        await fileResizeAndUpload(e.target.files[i]);
      }
      setImageLoading(false);
    } catch (error) {
      setImageLoading(true);
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const fileResizeAndUpload = async (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        Resizer.imageFileResizer(
          file,
          400,
          500,
          'JPEG',
          100,
          0,
          async (uri) => {
            try {
              let uploadedImage = await imageUploadToServer(uri);
              allImage = [...allImage, uploadedImage];
              setProductData({
                ...productData,
                images: allImage,
              });

              toast.success('Image Uploaded Successfully');
              resolve(true);
            } catch (err) {
              console.error(err);
              reject(err);
              toast.error('Image upload failed. Try later.');
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const removeImage = async (img) => {
    try {
      if (!img?.Location) {
        toast.error('No image to remove');
        return;
      }
      await removeImageFromServer(img);
      const updatedImages = productData.images.filter(
        (image) => image.Location !== img.Location
      );
      allImage = updatedImages;

      setProductData({ ...productData, images: allImage });

      toast.success('Image removed successfully');
    } catch (error) {
      toast.error('Image remove failed. Try later.');
    }
  };

  const handleOk = () => {
    // setIsModalVisible(false);
    if (imageLoading) {
      toast.error('Please wait for image to upload');
      return false;
    }

    console.log(productData);

    allImage = [];

    if (allImage.length > 3) {
      toast.error('Please upload only 3 images');
      return false;
    }

    if (
      productData.name === '' ||
      productData.color === '' ||
      productData.category === '' ||
      productData.brand === '' ||
      productData.highlightDescription === '' ||
      productData.description === '' ||
      productData.price < 1 ||
      productData.quantity < 1 ||
      productData.images.length < 1
    ) {
      toast.error('Please fill all the fields');
      return false;
    }

    if (currentSlug) {
      dispatch(updateProduct(currentSlug, productData));
    } else {
      dispatch(addProduct(productData));
    }
  };

  return (
    <Modal
      title='Add Your Product'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Save'
      width={800}
    >
      <div className='row'>
        <div className='col-md-6'>
          <input
            className='form-control mb-2 p-2'
            placeholder='Product name'
            value={productData.name}
            onChange={handleChange}
            name='name'
          />
        </div>
        <div className='col-md-6'>
          <input
            className='form-control mb-2 p-2'
            placeholder='Product color'
            value={productData.color}
            onChange={handleChange}
            name='color'
          />
        </div>
        <div className='col-md-6'>
          <select
            style={{ width: '100%' }}
            className='mb-2 form-control'
            value={productData.category}
            onChange={handleChange}
            name='category'
          >
            <option value=''>Select Category</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
          </select>
        </div>
        <div className='col-md-6'>
          <select
            style={{ width: '100%' }}
            className='mb-2 form-control'
            value={productData.brand}
            onChange={handleChange}
            name='brand'
          >
            <option value=''>Select Brand</option>
            {brands &&
              brands.map((brand, i) => (
                <option key={brand._id} value={brand._id}>
                  {brand.title}
                </option>
              ))}
          </select>
        </div>
        <div className='col-md-12'>
          <textarea
            className='form-control p-2 mb-2'
            placeholder='Product Highlight Description'
            maxLength='100'
            value={productData.highlightDescription}
            onChange={handleChange}
            name='highlightDescription'
          ></textarea>
        </div>
        <div className='col-md-12'>
          <textarea
            className='form-control p-2 mb-2'
            placeholder='Product Description'
            rows='5'
            maxLength='450'
            value={productData.description}
            onChange={handleChange}
            name='description'
          ></textarea>
        </div>
        <div className='col-md-6'>
          <input
            type='number'
            className='form-control mb-2 p-2'
            placeholder='Quantity'
            value={productData.quantity}
            onChange={handleChange}
            name='quantity'
          />
        </div>
        <div className='col-md-6'>
          <input
            type='number'
            className='form-control mb-2 p-2'
            placeholder='Price'
            value={productData.price}
            onChange={handleChange}
            name='price'
          />
        </div>
        <div className='col-md-12'>
          <div className='custom-control custom-switch mb-2'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customSwitch1'
              defaultChecked={productData.featured}
              onChange={(e) =>
                setProductData({ ...productData, featured: e.target.checked })
              }
              name='featured'
            />
            <label className='custom-control-label' htmlFor='customSwitch1'>
              Is it featured product ?
            </label>
          </div>
        </div>
        <div className='col-md-12'>
          <div className='form-group'>
            <label className='btn btn-outline-secondary btn-block text-left'>
              {imageLoading ? 'Uploading.....' : 'Upload Images'}
              <input
                type='file'
                name='image'
                onChange={handleImgChange}
                multiple
                maxLength={3}
                accept='image/*'
                hidden
              />
            </label>
          </div>
        </div>
        <div className='col-md-12'>
          {productData.images.length > 0 &&
            productData.images.map((image) => (
              <>
                <a target='_blank' href={image.Location}>
                  {image.key}
                </a>
                <small
                  onClick={() => removeImage(image)}
                  style={{
                    marginLeft: '5px',
                    color: 'red',
                    border: '1px solid red',
                    cursor: 'pointer',
                    padding: '3px',
                  }}
                >
                  X
                </small>{' '}
                <br />
              </>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default ProductFormModal;
