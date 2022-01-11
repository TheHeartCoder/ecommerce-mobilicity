import {
	ADD_WISHLIST_REQ,
	GET_WISHLIST_SUCCESS,
	GET_WISHLIST_REQ,
	GET_WISHLIST_FAIL,
	ADD_WISHLIST_SUCCESS,
	ADD_WISHLIST_FAIL,
	DEL_WISHLIST_REQ,
	DEL_WISHLIST_SUCCESS,
	DEL_WISHLIST_FAIL,
} from '../constants/wishlist';

export const wishlistReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_WISHLIST_REQ:
			return { ...state, loading: true, success: false };
		case GET_WISHLIST_SUCCESS:
			return {
				...state,
				wishlistItems: action.payload?.products || [],
				loading: false,
			};
		case GET_WISHLIST_FAIL:
			return { ...state, loading: false };

		case ADD_WISHLIST_REQ:
			return { ...state, loadingWishlist: true, success: false };
		case ADD_WISHLIST_SUCCESS:
			return {
				...state,
				success: true,
				loadingWishlist: false,
			};
		case ADD_WISHLIST_FAIL:
			return { ...state, loadingWishlist: false };

		case DEL_WISHLIST_REQ:
			return { ...state, loading: true, success: false };
		case DEL_WISHLIST_SUCCESS:
			return {
				...state,
				wishlistItems: state.wishlistItems.filter(
					(item) => item._id !== action.payload
				),
				succssDelete: true,
				loading: false,
			};
		case DEL_WISHLIST_FAIL:
			return { ...state, loading: false };

		default:
			return state;
	}
};

/**
 * 
    case UPDATE_BANNER_REQ:
      return { ...state, loading: true, success: false };
    case UPDATE_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_BANNER_FAIL:
      return { ...state, loading: false };

    case DEL_BANNER_REQ:
      return { ...state, loading: true, success: false };
    case DEL_BANNER_SUCCESS:
      return { ...state, success: true, loading: false };
    case DEL_BANNER_FAIL:
      return { ...state, loading: false };
 */
