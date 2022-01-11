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

export const addressReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADD_REQ:
      return { ...state, loading: true, success: false };
    case GET_ADD_SUCCESS:
      return { ...state, adds: action.payload, loading: false };
    case GET_ADD_FAIL:
      return { ...state, loading: false };

    case ADD_ADD_REQ:
      return { ...state, loading: true, success: false };
    case ADD_ADD_SUCCESS:
      return {
        ...state,
        adds: [...state.adds, action.payload],
        success: true,
        loading: false,
      };
    case ADD_ADD_FAIL:
      return { ...state, loading: false };

    case UPDATE_ADD_REQ:
      return { ...state, loading: true, success: false };
    case UPDATE_ADD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        adds: state.adds.map((add) =>
          action.payload._id === add._id ? action.payload : add
        ),
      };
    case UPDATE_ADD_FAIL:
      return { ...state, loading: false };

    case DEL_ADD_REQ:
      return { ...state, loading: true, success: false };
    case DEL_ADD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        adds: state.adds.filter((add) => action.payload !== add._id),
      };
    case DEL_ADD_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
