import axios from 'axios';

export const addAddressToServer = (body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post('/api/addresses', body);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const updateAddressToServer = (id, body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.put(`/api/addresses/${id}`, body);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const delAddressFromServer = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.delete(`/api/addresses/${id}`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getAddresssFromServer = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get('/api/addresses');
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getAddressesForUserFromServer = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(`/api/addresses/user`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};
