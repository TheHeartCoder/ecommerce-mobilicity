import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
} from '../constants/auth';

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN_SUCCESS:
			window.localStorage.setItem(
				'_usr_mobilicity',
				JSON.stringify({ ...action?.payload })
			);
			return { ...state, userInfo: action.payload, loading: false };

		case USER_LOGIN_FAIL:
			return { ...state, userInfo: null, loading: false };

		case USER_LOGOUT:
			localStorage.removeItem('_usr_mobilicity');
			return { ...state, userInfo: null };

		default:
			return state;
	}
};

// case USER_REGISTER_REQUEST:
//   return { ...state, loading: true };
// case USER_REGISTER_SUCCESS:
//   return { ...state, loading: false };
// case USER_REGISTER_FAIL:
//   return { ...state, loading: false };
