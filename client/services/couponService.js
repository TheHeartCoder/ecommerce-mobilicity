import axios from 'axios';

export const addCouponToServer = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post('/api/add-coupon', body);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const updateCouponToServer = (slug, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post(`/api/update-coupon/${slug}`, body);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const delCouponFromServer = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.delete(`/api/delete-coupon/${slug}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getCouponsFromServer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get('/api/all-coupon');
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getCouponFromServer = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`/api/get-coupon/${slug}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};
