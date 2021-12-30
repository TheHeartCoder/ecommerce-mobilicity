import axios from 'axios';

export const getIndexItemsFromServer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get('/api/get-index-items');
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};
