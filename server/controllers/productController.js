import slugify from 'slugify';
import Product from '../models/product';
import { deleteImageFromS3 } from '../helpers/awsHelper';

export const addProduct = async (req, res) => {
  try {
    const slug = slugify(
      req.body.name.toLowerCase() + '-' + req.body.color.toLowerCase()
    );

    const alreadyExist = await Product.findOne({ slug });
    if (alreadyExist) {
      return res.status(400).send('Product already exist');
    }
    // image  upload

    const product = await new Product({
      slug: slug,
      ...req.body,
    }).save();

    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong with save product data');
  }
};

export const updateProduct = async (req, res) => {
  try {
    const exist = await Product.findOne({ slug: req.params.slug });
    if (!exist) return res.status(404).send('Product not found');

    const newslug = slugify(
      req.body.name.toLowerCase() + '-' + req.body.color.toLowerCase()
    );

    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      {
        slug: newslug,
        ...req.body,
      },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for updating product');
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const exist = await Product.findOne({ slug: req.params.slug });
    if (exist) {
      await Promise.all(
        exist.images.map(async (image) => {
          return await deleteImageFromS3(image);
        })
      );

      await Product.findOneAndDelete({ slug: req.params.slug });
      res.json({ ok: true });
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for deleting product');
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting product');
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page, limit, sort, order, keyword } = req.query;
    const pageSize = limit || 10;
    const skip = (page - 1) * pageSize;
    const sortBy = sort ? sort : 'name';
    const orderBy = order ? order : 'asc';
    // const allFilter = JSON.parse(req.query.filter);
    let findQuery = {};

    // if (keyword) {
    // 	findQuery = {
    // 		...findQuery,
    // 		name: {
    // 			$regex: keyword,
    // 			$options: 'i',
    // 		},
    // 	};
    // }

    // if (allFilter.category) {
    // 	findQuery = {
    // 		...findQuery,
    // 		category: allFilter.category,
    // 	};
    // }

    // if (allFilter.brand) {
    // 	findQuery = {
    // 		...findQuery,
    // 		brand: allFilter.brand,
    // 	};
    // }

    const count = await Product.countDocuments(findQuery);

    const products = await Product.find(findQuery)
      .sort({ [sortBy]: orderBy })
      .skip(skip)
      .limit(pageSize)
      .populate('brand')
      .populate('category');

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count: count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting products');
  }
};

/**
 * 
 * There are a few issues here:

key and params[key] should be url-encoded, you can use encodeURIComponent(...) for this (it's a standard function)
Since params[key] is an object in two cases (searchParam, sortParam), the string presentation will be [Object object]. Instead try: return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key]))
On the server-side, you probably need to run JSON.parse(req.query.searchParams) to get your object back
 */
