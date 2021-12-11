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

export const brandReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_BRAND_REQ:
			return { ...state, loading: true, success: false };
		case GET_BRAND_SUCCESS:
			return { ...state, brands: action.payload, loading: false };
		case GET_BRAND_FAIL:
			return { ...state, loading: false };

		case ADD_BRAND_REQ:
			return { ...state, loading: true };
		case ADD_BRAND_SUCCESS:
			return { ...state, success: true, loading: false };
		case ADD_BRAND_FAIL:
			return { ...state, loading: false };

		case UPDATE_BRAND_REQ:
			return { loading: true };
		case UPDATE_BRAND_SUCCESS:
			return { ...state, success: true, loading: false };
		case UPDATE_BRAND_FAIL:
			return { ...state, loading: false };

		case DEL_BRAND_REQ:
			return { loading: true };
		case DEL_BRAND_SUCCESS:
			return { ...state, success: true, loading: false };
		case DEL_BRAND_FAIL:
			return { ...state, loading: false };

		// case BRAND_RESET:
		// 	return { ...state, categories: [], success: false, loading: false };

		default:
			return state;
	}
};
