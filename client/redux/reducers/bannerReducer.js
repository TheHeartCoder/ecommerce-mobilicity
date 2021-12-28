import {
  ADD_BANNER_FAIL,
  ADD_BANNER_REQ,
  ADD_BANNER_SUCCESS,
  DEL_BANNER_FAIL,
  DEL_BANNER_REQ,
  DEL_BANNER_SUCCESS,
  GET_BANNER_FAIL,
  GET_BANNER_REQ,
  GET_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_REQ,
  UPDATE_BANNER_SUCCESS,
} from '../constants/banner';

export const bannerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BANNER_REQ:
      return { ...state, loading: true, success: false };
    case GET_BANNER_SUCCESS:
      return { ...state, banners: action.payload, loading: false };
    case GET_BANNER_FAIL:
      return { ...state, loading: false };

    case ADD_BANNER_REQ:
      return { ...state, loading: true };
    case ADD_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case ADD_BANNER_FAIL:
      return { ...state, loading: false };

    case UPDATE_BANNER_REQ:
      return { loading: true };
    case UPDATE_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_BANNER_FAIL:
      return { ...state, loading: false };

    case DEL_BANNER_REQ:
      return { loading: true };
    case DEL_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case DEL_BANNER_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
