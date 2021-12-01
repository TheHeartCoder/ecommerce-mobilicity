import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../../services/authService';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/auth';

export const loginUserAction = (body) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const data = await loginUser(body);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    toast.success('Login Successful');
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
    });
    toast.error(error);
  }
};

export const registerUserAction = (body) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const data = await registerUser(body);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    toast.success(
      'Registration Successful. Please check your registered email inbox and follow the instruction to activate your account'
    );
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
    });
    toast.error(error);
  }
};
