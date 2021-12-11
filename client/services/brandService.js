import axios from 'axios';
import { removeImageFromServer } from './imageService';

export const addBrandToServer = (body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post('/api/add-brand', body);
			resolve(data);
		} catch (error) {
			await removeImageFromServer(body.image);
			reject(error?.response?.data);
		}
	});
};

export const updateBrandToServer = (slug, body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post(`/api/update-brand/${slug}`, body);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const delBrandFromServer = (slug) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.delete(`/api/delete-brand/${slug}`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getBrandsFromServer = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get('/api/all-brand');
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getBrandFromServer = (slug) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(`/api/get-brand/${slug}`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};
