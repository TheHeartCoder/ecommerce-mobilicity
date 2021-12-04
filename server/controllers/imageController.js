import { uploadImageToS3, deleteImageFromS3 } from '../helpers/awsHelper';

export const uploadImage = async (req, res) => {
	try {
		const { image } = req.body;
		if (!image) return res.status(400).send('image is required');
		const imageData = await uploadImageToS3(image);
		req.send(imageData);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error for uploading image');
	}
};

export const removeImage = async (req, res) => {
	try {
		const { image } = req.body;
		if (!image) return res.status(400).send('No image to delete');
		const result = await deleteImageFromS3(image);

		if (result) {
			res.send({ ok: true });
		} else {
			res.status(400).send('Internal server error for deleting image');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error for deleting image');
	}
};
export const uploadMultipleImage = async (req, res) => {
	try {
		const { images } = req.body;
		if (!images || images.length === 0)
			return res.status(400).send('No images to upload');
		const imageData = await Promise.all(
			images.map(async (image) => {
				return await uploadImageToS3(image);
			})
		);
		res.send(imageData);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error for uploading image');
	}
};

export const removeMultipleImage = async (req, res) => {
	try {
		const { images } = req.body;
		if (!images || images.length === 0)
			return res.status(400).send('No images to delete');
		const result = await Promise.all(
			images.map(async (image) => {
				return await deleteImageFromS3(image);
			})
		);
		if (result) {
			res.send({ ok: true });
		} else {
			res.status(400).send('Internal server error for deleting image');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error for uploading image');
	}
};
