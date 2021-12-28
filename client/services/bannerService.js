import axios from 'axios';
import { removeImageFromServer } from './imageService';

export const addBannerToServer = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post('/api/add-banner', body);
      resolve(data);
    } catch (error) {
      await removeImageFromServer(body.image);
      reject(error?.response?.data);
    }
  });
};

export const updateBannerToServer = (slug, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post(`/api/update-banner/${slug}`, body);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const delBannerFromServer = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.delete(`/api/delete-banner/${slug}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getBannersFromServer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get('/api/all-banner');
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getBannerFromServer = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`/api/get-banner/${slug}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};
