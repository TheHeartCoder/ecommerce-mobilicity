import toast from 'react-hot-toast';
import {
  addBannerToServer,
  delBannerFromServer,
  getBannersFromServer,
  updateBannerToServer,
} from '../../services/bannerService';
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

export const addBanner = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BANNER_REQ,
    });

    const {
      loggedInUser: { userInfo },
    } = getState();

    const data = await addBannerToServer(body, userInfo.token);

    dispatch({
      type: ADD_BANNER_SUCCESS,
    });
    toast.success('Banner added successfully');
  } catch (error) {
    dispatch({
      type: ADD_BANNER_FAIL,
    });
    toast.error(error);
  }
};

export const updateBanner = (slug, body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BANNER_REQ,
    });
    const data = await updateBannerToServer(slug, body);

    dispatch({
      type: UPDATE_BANNER_SUCCESS,
    });
    toast.success('Banner updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
    });
    toast.error(error);
  }
};

export const deleteBanner = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: DEL_BANNER_REQ,
    });
    const data = await delBannerFromServer(slug);

    dispatch({
      type: DEL_BANNER_SUCCESS,
    });
    toast.success('Banner deleted successfully');
  } catch (error) {
    dispatch({
      type: DEL_BANNER_FAIL,
    });
    toast.error(error);
  }
};

export const getBanners = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_BANNER_REQ,
    });
    const data = await getBannersFromServer();

    dispatch({
      type: GET_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BANNER_FAIL,
    });
    toast.error(error);
  }
};
