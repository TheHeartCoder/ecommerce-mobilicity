import slugify from 'slugify';
import Brand from '../models/brand';
import { deleteImageFromS3 } from '../helpers/awsHelper';

export const addBrand = async (req, res) => {
	try {
		const { title, description, image } = req.body;

		if (!title || !description || !image) {
			return res.status(400).send('Please provide all required fields');
		}

		const slug = slugify(title.toLowerCase());

		const alreadyExist = await Brand.findOne({ slug });
		if (alreadyExist) {
			return res.status(400).send('Brand already exist');
		}
		// image  upload

		const brand = await new Brand({
			slug: slug,
			title,
			description,
			image: image,
		}).save();

		res.json(brand);
	} catch (error) {
		console.log(err);
		return res.status(500).send('Something went wrong with save brand data');
	}
};

export const updateBrand = async (req, res) => {
	try {
		const { title, description, image } = req.body;
		if (!title || !description || !image) {
			return res.status(400).send('Please provide all required fields');
		}

		const existBrand = await Brand.findOne({ slug: req.params.slug });
		if (!existBrand) return res.status(404).send('Brand not found');

		const newslug = slugify(title.toLowerCase());

		const brand = await Brand.findOneAndUpdate(
			{ slug: req.params.slug },
			{
				title,
				description,
				slug: newslug,
				image,
			},
			{ new: true }
		);
		res.json(brand);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for updating brand');
	}
};

export const deleteBrand = async (req, res) => {
	try {
		const existBrand = await Brand.findOne({ slug: req.params.slug });
		if (existBrand) {
			await deleteImageFromS3(existBrand.image);
			await Brand.findOneAndDelete({ slug: req.params.slug });
			res.json({ ok: true });
		} else {
			res.status(404).send('Brand not found');
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for deleting brand');
	}
};

export const getBrand = async (req, res) => {
	try {
		const brand = await Brand.findOne({ slug: req.params.slug });
		res.json(brand);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for getting brand');
	}
};

export const getBrands = async (req, res) => {
	try {
		const brand = await Brand.find({});
		res.json(brand);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for getting brand');
	}
};
