import Coupon from '../models/coupon';
import { deleteImageFromS3 } from '../helpers/awsHelper';

export const addCoupon = async (req, res) => {
  try {
    const {
      code,
      startDate,
      endDate,
      limit,
      couponType,
      discount,
      minimumOrderAmount,
    } = req.body;

    if (
      !code ||
      !startDate ||
      !endDate ||
      !limit ||
      !couponType ||
      !discount ||
      !minimumOrderAmount
    ) {
      return res.status(400).send('Please provide all required fields');
    }

    const coupon = await new Coupon({
      code,
      startDate,
      endDate,
      limit,
      couponType,
      discount,
      minimumOrderAmount,
    }).save();

    res.json(coupon);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong with save coupon data');
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const {
      code,
      startDate,
      endDate,
      limit,
      couponType,
      discount,
      minimumOrderAmount,
    } = req.body;
    if (
      !code ||
      !startDate ||
      !endDate ||
      !limit ||
      !couponType ||
      !discount ||
      !minimumOrderAmount
    ) {
      return res.status(400).send('Please provide all required fields');
    }

    const existCoupon = await Coupon.findById(req.params.id);
    if (!existCoupon) return res.status(404).send('Coupon not found');

    const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
      code,
      startDate,
      endDate,
      limit,
      couponType,
      discount,
      minimumOrderAmount,
    });

    res.json(coupon);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for updating coupon');
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const existCoupon = await Coupon.findById(req.params.id);
    if (existCoupon) {
      await Coupon.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    } else {
      res.status(404).send('Coupon not found');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for deleting coupon');
  }
};

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    res.json(coupon);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting coupon');
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.find({});
    res.json(coupon);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting coupon');
  }
};
