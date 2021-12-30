import toast from 'react-hot-toast';

import {
  addCouponToServer,
  delCouponFromServer,
  getCouponsFromServer,
  updateCouponToServer,
} from '../../services/couponService';
import {
  ADD_COUPON_FAIL,
  ADD_COUPON_REQ,
  ADD_COUPON_SUCCESS,
  DEL_COUPON_FAIL,
  DEL_COUPON_REQ,
  DEL_COUPON_SUCCESS,
  GET_COUPON_FAIL,
  GET_COUPON_REQ,
  GET_COUPON_SUCCESS,
  UPDATE_COUPON_FAIL,
  UPDATE_COUPON_REQ,
  UPDATE_COUPON_SUCCESS,
} from '../constants/coupon';

export const addCoupon = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_COUPON_REQ,
    });

    const {
      loggedInUser: { userInfo },
    } = getState();

    const data = await addCouponToServer(body, userInfo.token);

    dispatch({
      type: ADD_COUPON_SUCCESS,
    });
    toast.success('Coupon added successfully');
  } catch (error) {
    dispatch({
      type: ADD_COUPON_FAIL,
    });
    toast.error(error);
  }
};

export const updateCoupon = (slug, body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_COUPON_REQ,
    });
    const data = await updateCouponToServer(slug, body);

    dispatch({
      type: UPDATE_COUPON_SUCCESS,
    });
    toast.success('Coupon updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_COUPON_FAIL,
    });
    toast.error(error);
  }
};

export const deleteCoupon = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: DEL_COUPON_REQ,
    });
    const data = await delCouponFromServer(slug);

    dispatch({
      type: DEL_COUPON_SUCCESS,
    });
    toast.success('Coupon deleted successfully');
  } catch (error) {
    dispatch({
      type: DEL_COUPON_FAIL,
    });
    toast.error(error);
  }
};

export const getCoupons = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_COUPON_REQ,
    });
    const data = await getCouponsFromServer();

    dispatch({
      type: GET_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COUPON_FAIL,
    });
    toast.error(error);
  }
};
