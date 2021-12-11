import axios from 'axios';
import { removeImageFromServer } from './imageService';

export const addProductToServer = (body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post('/api/add-product', body);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const updateProductToServer = (slug, body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post(`/api/update-product/${slug}`, body);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const delProductFromServer = (slug) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.delete(`/api/delete-product/${slug}`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getProductsFromServer = (page, limit, sort, order, keyword) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(
				`/api/all-products?page=${page}&limit=${limit}&sort=${sort}&order=${order}&keyword=${keyword}`
			);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getProductFromServer = (slug) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(`/api/get-product/${slug}`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};
