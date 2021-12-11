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

export const categoryReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_CATEGORY_REQ:
			return { ...state, loading: true, success: false };
		case GET_CATEGORY_SUCCESS:
			return { ...state, categories: action.payload, loading: false };
		case GET_CATEGORY_FAIL:
			return { ...state, loading: false };

		case ADD_CATEGORY_REQ:
			return { ...state, loading: true };
		case ADD_CATEGORY_SUCCESS:
			return { ...state, success: true, loading: false };
		case ADD_CATEGORY_FAIL:
			return { ...state, loading: false };

		case UPDATE_CATEGORY_REQ:
			return { loading: true };
		case UPDATE_CATEGORY_SUCCESS:
			return { ...state, success: true, loading: false };
		case UPDATE_CATEGORY_FAIL:
			return { ...state, loading: false };

		case DEL_CATEGORY_REQ:
			return { loading: true };
		case DEL_CATEGORY_SUCCESS:
			return { ...state, success: true, loading: false };
		case DEL_CATEGORY_FAIL:
			return { ...state, loading: false };

		// case CATEGORY_RESET:
		// 	return { ...state, categories: [], success: false, loading: false };

		default:
			return state;
	}
};
