import axios from 'axios';

export const createOrder = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post('/api/orders', body);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const payOrder = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post(
        `/api/orders/pay/${body.id}`,
        body.paymentResult
      );
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};
