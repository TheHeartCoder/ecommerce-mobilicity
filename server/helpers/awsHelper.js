import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: process.env.AWS_REGION,
	apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const sendEmail = async (email, subject, body) => {};

export const uploadImageToS3 = async (image) => {
	return new Promise((resolve, reject) => {
		try {
			// prepare the image
			const base64Data = new Buffer.from(
				image.replace(/^data:image\/\w+;base64,/, ''),
				'base64'
			);
			const type = image.split(';')[0].split('/')[1];
			const params = {
				Bucket: 'udemy-clone-mern',
				Key: `${nanoid()}.${type}`,
				Body: base64Data,
				ACL: 'public-read',
				ContentEncoding: 'base64',
				ContentType: `image/${type}`,
			};

			// upload to s3
			S3.upload(params, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		} catch (error) {
			reject(error);
		}
	});
};
export const deleteImageFromS3 = async (image) => {
	return new Promise((resolve, reject) => {
		try {
			const params = {
				Bucket: image.Bucket,
				Key: image.Key,
			};

			// delete from s3
			S3.deleteObject(params, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(true);
			});
		} catch (error) {
			reject(error);
		}
	});
};
