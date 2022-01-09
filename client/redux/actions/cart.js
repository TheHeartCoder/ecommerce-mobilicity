import {
  ADD_CART_REQ,
  GET_CART_SUCCESS,
  GET_CART_REQ,
  GET_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  DEL_CART_SUCCESS,
  DEL_CART_REQ,
  DEL_CART_FAIL,
} from '../constants/cart';
import toast from 'react-hot-toast';
import {
  addCartItemToServer,
  deleteCartItemFromServer,
  getCartItemsFromServer,
} from '../../services/cartService';

export const getCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CART_REQ,
    });

    const data = await getCartItemsFromServer();

    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
    });
    toast.error(error);
  }
};

export const addCartItem = (body) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CART_REQ,
    });

    await addCartItemToServer(body);

    dispatch({
      type: ADD_CART_SUCCESS,
      payload: body,
    });
    toast.success('Added to cart successfully');
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_CART_FAIL,
    });
    toast.error(error);
  }
};

export const delCartItem = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEL_CART_REQ,
    });

    await deleteCartItemFromServer(id);

    dispatch({
      type: DEL_CART_SUCCESS,
      payload: id,
    });
    toast.success('This item removed from cart successfully');
  } catch (error) {
    console.log(error);
    dispatch({
      type: DEL_CART_FAIL,
    });
    toast.error(error);
  }
};
