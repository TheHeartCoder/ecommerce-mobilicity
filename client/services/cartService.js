import axios from 'axios';

export const addCartItemToServer = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post('/api/all-cart-items', body);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getCartItemsFromServer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`/api/all-cart-items`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const deleteCartItemFromServer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.delete(`/api/all-cart-items/${id}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};
