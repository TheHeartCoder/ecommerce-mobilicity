import slugify from 'slugify';
import Category from '../models/category';
import { deleteImageFromS3 } from '../helpers/awsHelper';

export const addCategory = async (req, res) => {
	try {
		const { title, description, image } = req.body;
		if (!title || !description || !image) {
			return res.status(400).send('Please provide all required fields');
		}
		const slug = slugify(title.toLowerCase());

		const alreadyExist = await Category.findOne({ slug });
		if (alreadyExist) {
			return res.status(400).send('Category already exist');
		}
		// image  upload

		const category = await new Category({
			slug: slug,
			title,
			description,
			image: image,
		}).save();

		res.json(category);
	} catch (error) {
		console.log(err);
		return res.status(500).send('Something went wrong with cartegory creation');
	}
};

export const updateCategory = async (req, res) => {
	try {
		const { title, description, image } = req.body;
		if (!title || !description || !image) {
			return res.status(400).send('Please provide all required fields');
		}
		const existCayegory = await Category.findOne({ slug: req.params.slug });
		if (!existCayegory) return res.status(404).send('Category not found');

		const newslug = slugify(title.toLowerCase());

		const category = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{
				title,
				description,
				slug: newslug,
				image,
			},
			{ new: true }
		);
		res.json(category);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for updating category');
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const existCayegory = await Category.findOne({ slug: req.params.slug });
		if (existCayegory) {
			await deleteImageFromS3(existCayegory.image);
			await Category.findOneAndDelete({ slug: req.params.slug });
			res.json({ ok: true });
		} else {
			res.status(404).send('Category not found');
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for deleting category');
	}
};

export const getCategory = async (req, res) => {
	try {
		const category = await Category.findOne({ slug: req.params.slug });
		res.json(category);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for getting category');
	}
};

export const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		res.json(categories);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal server error for getting categories');
	}
};
