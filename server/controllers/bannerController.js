import Banner from '../models/banner';
import { deleteImageFromS3 } from '../helpers/awsHelper';

export const addBanner = async (req, res) => {
  try {
    const { link, image } = req.body;

    if (!link || !image) {
      return res.status(400).send('Please provide all required fields');
    }

    const banner = await new Banner({
      link,
      image: image,
    }).save();

    res.json(banner);
  } catch (error) {
    console.log(err);
    return res.status(500).send('Something went wrong with save banner data');
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { link, image } = req.body;
    if (!link || !image) {
      return res.status(400).send('Please provide all required fields');
    }

    const existBanner = await Banner.findOne({ _id: req.params.id });
    if (!existBanner) return res.status(404).send('Banner not found');

    const banner = await Banner.findOneAndUpdate(
      { _id: req.params._id },
      {
        link,
        image,
      },
      { new: true }
    );
    res.json(banner);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for updating banner');
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const existBanner = await Banner.findById(req.params.id);
    if (existBanner) {
      await deleteImageFromS3(existBanner.image);
      await Banner.findOneAndDelete({ _id: req.params.id });
      res.json({ ok: true });
    } else {
      res.status(404).send('Banner not found');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for deleting banner');
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.json(banner);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting banner');
  }
};

export const getBanners = async (req, res) => {
  try {
    const banner = await Banner.find({});
    res.json(banner);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting banner');
  }
};
