import axios from 'axios';

export const imageUploadToServer = (uri) => {
	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post('/api/image-upload', {
				image: uri,
			});
			resolve(data);
		} catch (error) {
			reject(error.response.data);
		}
	});
};

export const removeImageFromServer = (image) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.post('/api/image-remove', { image });
			resolve(data);
		} catch (error) {
			reject(error.response.data);
			// reject(error.response.data.message);
		}
	});
};
