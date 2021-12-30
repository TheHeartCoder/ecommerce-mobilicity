import toast from 'react-hot-toast';
import {
  addBrandToServer,
  delBrandFromServer,
  getBrandsFromServer,
  updateBrandToServer,
} from '../../services/brandService';

import {
  ADD_BRAND_REQ,
  ADD_BRAND_SUCCESS,
  DEL_BRAND_REQ,
  DEL_BRAND_SUCCESS,
  GET_BRAND_REQ,
  GET_BRAND_SUCCESS,
  UPDATE_BRAND_REQ,
  GET_BRAND_FAIL,
  UPDATE_BRAND_SUCCESS,
  DEL_BRAND_FAIL,
  UPDATE_BRAND_FAIL,
  ADD_BRAND_FAIL,
} from '../constants/brand';

export const addBrand = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BRAND_REQ,
    });

    const {
      loggedInUser: { userInfo },
    } = getState();

    const data = await addBrandToServer(body, userInfo.token);

    dispatch({
      type: ADD_BRAND_SUCCESS,
    });
    toast.success('Brand added successfully');
  } catch (error) {
    dispatch({
      type: ADD_BRAND_FAIL,
    });
    toast.error(error);
  }
};

export const updateBrand = (slug, body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BRAND_REQ,
    });
    const data = await updateBrandToServer(slug, body);

    dispatch({
      type: UPDATE_BRAND_SUCCESS,
    });
    toast.success('Brand updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
    });
    toast.error(error);
  }
};

export const deleteBrand = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: DEL_BRAND_REQ,
    });
    const data = await delBrandFromServer(slug);

    dispatch({
      type: DEL_BRAND_SUCCESS,
    });
    toast.success('Brand deleted successfully');
  } catch (error) {
    dispatch({
      type: DEL_BRAND_FAIL,
    });
    toast.error(error);
  }
};

export const getBrands =
  (page = '', limit = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BRAND_REQ,
      });
      const data = await getBrandsFromServer(page, limit);

      dispatch({
        type: GET_BRAND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BRAND_FAIL,
      });
      toast.error(error);
    }
  };
