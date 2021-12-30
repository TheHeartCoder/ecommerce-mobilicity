import toast from 'react-hot-toast';
import {
  addCategoryToServer,
  delCategoryFromServer,
  getCategoriesFromServer,
  updateCategoryToServer,
} from '../../services/categoryService';

import {
  ADD_CATEGORY_REQ,
  ADD_CATEGORY_SUCCESS,
  DEL_CATEGORY_REQ,
  DEL_CATEGORY_SUCCESS,
  GET_CATEGORY_REQ,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQ,
  GET_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_FAIL,
  UPDATE_CATEGORY_FAIL,
  ADD_CATEGORY_FAIL,
} from '../constants/category';

export const addCategory = (body) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CATEGORY_REQ,
    });
    const data = await addCategoryToServer(body);

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
    });
    toast.success('Category added successfully');
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
    });
    toast.error(error);
  }
};

export const updateCategory = (slug, body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_REQ,
    });
    const data = await updateCategoryToServer(slug, body);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
    });
    toast.success('Category updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
    });
    toast.error(error);
  }
};

export const deleteCategory = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: DEL_CATEGORY_REQ,
    });
    const data = await delCategoryFromServer(slug);

    dispatch({
      type: DEL_CATEGORY_SUCCESS,
    });
    toast.success('Category deleted successfully');
  } catch (error) {
    dispatch({
      type: DEL_CATEGORY_FAIL,
    });
    toast.error(error);
  }
};

export const getCategories =
  (page = '', limit = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CATEGORY_REQ,
      });
      const data = await getCategoriesFromServer(page, limit);

      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CATEGORY_FAIL,
      });
      toast.error(error);
    }
  };
