import axios from 'axios';
import { removeImageFromServer } from './imageService';

export const addCategoryToServer = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post('/api/add-category', body);
      resolve(data);
    } catch (error) {
      await removeImageFromServer(body.image);
      reject(error?.response?.data);
    }
  });
};

export const updateCategoryToServer = (slug, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post(`/api/update-category/${slug}`, body);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const delCategoryFromServer = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.delete(`/api/delete-category/${slug}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getCategoriesFromServer = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(
        `/api/all-category?page=${page}&limit=${limit}`
      );
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};

export const getCategoryFromServer = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`/api/get-category/${slug}`);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data);
    }
  });
};
