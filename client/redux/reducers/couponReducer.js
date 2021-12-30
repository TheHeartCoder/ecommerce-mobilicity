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

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COUPON_REQ:
      return { ...state, loading: true, success: false };
    case GET_COUPON_SUCCESS:
      return { ...state, coupons: action.payload, loading: false };
    case GET_COUPON_FAIL:
      return { ...state, coupons: state.coupons, loading: false };

    case ADD_COUPON_REQ:
      return { ...state, loading: true, success: false };
    case ADD_COUPON_SUCCESS:
      return { ...state, success: true, loading: false };
    case ADD_COUPON_FAIL:
      return { ...state, loading: false };

    case UPDATE_COUPON_REQ:
      return { ...state, loading: true, success: false };
    case UPDATE_COUPON_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_COUPON_FAIL:
      return { ...state, loading: false };

    case DEL_COUPON_REQ:
      return { ...state, loading: true, success: false };
    case DEL_COUPON_SUCCESS:
      return { ...state, success: true, loading: false };
    case DEL_COUPON_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
