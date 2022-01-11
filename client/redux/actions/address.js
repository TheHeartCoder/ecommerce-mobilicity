import toast from 'react-hot-toast';
import {
  addAddressToServer,
  updateAddressToServer,
  getAddresssFromServer,
  delAddressFromServer,
  getAddressesForUserFromServer,
} from '../../services/addressService';

import {
  ADD_ADD_FAIL,
  ADD_ADD_REQ,
  ADD_ADD_SUCCESS,
  DEL_ADD_FAIL,
  DEL_ADD_REQ,
  DEL_ADD_SUCCESS,
  GET_ADD_FAIL,
  GET_ADD_REQ,
  GET_ADD_SUCCESS,
  UPDATE_ADD_FAIL,
  UPDATE_ADD_REQ,
  UPDATE_ADD_SUCCESS,
} from '../constants/address';

export const addAddress = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_ADD_REQ,
    });

    const data = await addAddressToServer(body);

    dispatch({
      type: ADD_ADD_SUCCESS,
      payload: data,
    });
    toast.success('Address added successfully');
  } catch (error) {
    dispatch({
      type: ADD_ADD_FAIL,
    });
    toast.error(error);
  }
};

export const updateAddress = (id, body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ADD_REQ,
    });
    const data = await updateAddressToServer(id, body);

    dispatch({
      type: UPDATE_ADD_SUCCESS,
      payload: data,
    });
    toast.success('Address updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_ADD_FAIL,
    });
    toast.error(error);
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEL_ADD_REQ,
    });
    const data = await delAddressFromServer(id);

    dispatch({
      type: DEL_ADD_SUCCESS,
      payload: id,
    });
    toast.success('Address deleted successfully');
  } catch (error) {
    dispatch({
      type: DEL_ADD_FAIL,
    });
    toast.error(error);
  }
};

export const getAddresss = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADD_REQ,
    });
    const data = await getAddresssFromServer();

    dispatch({
      type: GET_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADD_FAIL,
    });
    toast.error(error);
  }
};

export const getUserAddress = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADD_REQ,
    });
    const data = await getAddressesForUserFromServer();

    dispatch({
      type: GET_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADD_FAIL,
    });
    toast.error(error);
  }
};
