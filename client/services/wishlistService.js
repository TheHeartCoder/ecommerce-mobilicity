import axios from 'axios';

export const addWishlistItemToServer = (body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post('/api/wishlist', body);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const getWishlistItemsFromServer = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(`/api/wishlist`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};

export const deleteWishlistItemFromServer = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.delete(`/api/wishlist/${id}`);
			resolve(data);
		} catch (error) {
			reject(error?.response?.data);
		}
	});
};
