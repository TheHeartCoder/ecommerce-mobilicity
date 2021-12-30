import {
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQ,
  ADD_PRODUCT_SUCCESS,
  DEL_PRODUCT_REQ,
  DEL_PRODUCT_SUCCESS,
  GET_PRODUCT_REQ,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQ,
  GET_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAIL,
  UPDATE_PRODUCT_FAIL,
  ADD_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQ,
} from '../constants/product';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQ:
      return { ...state, loading: true, success: false };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload?.products,
        count: action.payload?.count,
        page: action.payload?.page,
        pages: action.payload?.pages,
        loading: false,
      };
    case GET_PRODUCT_FAIL:
      return { ...state, loading: false };

    case ADD_PRODUCT_REQ:
      return { ...state, loading: true, success: false };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, success: true, loading: false };
    case ADD_PRODUCT_FAIL:
      return { ...state, loading: false };

    case UPDATE_PRODUCT_REQ:
      return { ...state, loading: true, success: false };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false };

    case DEL_PRODUCT_REQ:
      return { ...state, loading: true, success: false };
    case DEL_PRODUCT_SUCCESS:
      return { ...state, success: true, loading: false };
    case DEL_PRODUCT_FAIL:
      return { ...state, loading: false };

    case GET_SINGLE_PRODUCT_REQ:
      return { ...state, loading: true, success: false };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case GET_SINGLE_PRODUCT_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
