import { Modal, DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;

const { Option } = Select;
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';
import {
  addCoupon,
  getCoupons,
  updateCoupon,
} from '../../redux/actions/coupon';

const couponDetailsInit = {
  code: '',
  startDate: '',
  endDate: '',
  limit: '',
  couponType: '',
  discount: '',
  minimumOrderAmount: '',
};

const CouponFormModal = ({
  isModalVisible,
  setIsModalVisible,
  loading,
  success,
  currentSlug,
  coupons,
  setCurrentSlug,
}) => {
  const [couponDetails, setCouponDetails] = useState(couponDetailsInit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isModalVisible) {
      setCurrentSlug(null);
      setCouponDetails(couponDetailsInit);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (success) {
      setIsModalVisible(false);
      dispatch(getCoupons());
    }
  }, [success]);

  useEffect(() => {
    if (currentSlug) {
      const coupon = coupons.find((c) => c._id === currentSlug);

      setCouponDetails({ ...couponDetails, ...coupon });
      setIsModalVisible(true);
    }
  }, [currentSlug]);

  const handleOk = () => {
    console.log(couponDetails);
    // return;
    if (loading) {
      return false;
    }

    if (
      !couponDetails.code ||
      !couponDetails.startDate ||
      !couponDetails.endDate ||
      !couponDetails.limit ||
      !couponDetails.couponType ||
      !couponDetails.discount ||
      !couponDetails.minimumOrderAmount
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    if (currentSlug) {
      dispatch(updateCoupon(currentSlug, couponDetails));
    } else {
      dispatch(addCoupon(couponDetails));
    }
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title='Add Your Coupons'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Save'
    >
      <input
        type='text'
        className='form-control mb-2 p-2'
        placeholder='Coupon code'
        value={couponDetails.code}
        onChange={(e) =>
          setCouponDetails({ ...couponDetails, code: e.target.value })
        }
      />
      <RangePicker
        disabledDate={disabledDate}
        style={{ width: '100%' }}
        className='mb-2'
        defaultValue={[moment('YYYY-MM-DD'), moment('YYYY-MM-DD')]}
        value={
          couponDetails.startDate && [
            moment(couponDetails.startDate, 'YYYY-MM-DD'),
            moment(couponDetails.endDate, 'YYYY-MM-DD'),
          ]
        }
        onChange={(date, dateString) =>
          setCouponDetails({
            ...couponDetails,
            startDate: dateString[0],
            endDate: dateString[1],
          })
        }
      />
      <input
        className='form-control mb-2 p-2'
        placeholder='Coupons limit'
        value={couponDetails.limit}
        onChange={(e) =>
          setCouponDetails({ ...couponDetails, limit: e.target.value })
        }
      />
      <Select
        defaultValue=''
        value={couponDetails.couponType}
        onChange={(val) =>
          setCouponDetails({ ...couponDetails, couponType: val })
        }
        style={{ width: '100%' }}
        className='mb-2'
      >
        <Option value='' key='123'>
          Select Coupon Type
        </Option>
        <Option value='amount' key='183'>
          Fixed Amount
        </Option>
        <Option value='percentage' key='823'>
          Percentage
        </Option>
      </Select>
      <input
        type='number'
        className='form-control mb-2 p-2'
        placeholder='Discount Value'
        value={couponDetails.discount}
        onChange={(e) =>
          setCouponDetails({ ...couponDetails, discount: e.target.value })
        }
      />
      <input
        type='number'
        className='form-control mb-2 p-2'
        placeholder='Minimum order amount'
        value={couponDetails.minimumOrderAmount}
        onChange={(e) =>
          setCouponDetails({
            ...couponDetails,
            minimumOrderAmount: e.target.value,
          })
        }
      />
    </Modal>
  );
};

export default CouponFormModal;
