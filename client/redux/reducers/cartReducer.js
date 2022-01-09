import {
  ADD_CART_REQ,
  GET_CART_SUCCESS,
  GET_CART_REQ,
  GET_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  DEL_CART_REQ,
  DEL_CART_SUCCESS,
  DEL_CART_FAIL,
} from '../constants/cart';

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_REQ:
      return { ...state, loading: true, success: false };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload?.products || [],
        loading: false,
      };
    case GET_CART_FAIL:
      return { ...state, loading: false };

    case ADD_CART_REQ:
      return { ...state, loadingCart: true, success: false };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        success: true,
        loadingCart: false,
        cartItems:
          state.cartItems &&
          state.cartItems.map((item) =>
            item.product._id === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
      };
    case ADD_CART_FAIL:
      return { ...state, loadingCart: false };

    case DEL_CART_REQ:
      return { ...state, loading: true, success: false };
    case DEL_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
        loading: false,
      };
    case DEL_CART_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

/**
 * 
    case UPDATE_BANNER_REQ:
      return { ...state, loading: true, success: false };
    case UPDATE_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_BANNER_FAIL:
      return { ...state, loading: false };

    case DEL_BANNER_REQ:
      return { ...state, loading: true, success: false };
    case DEL_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case DEL_BANNER_FAIL:
      return { ...state, loading: false };
 */
