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
import toast from 'react-hot-toast';
import {
	addWishlistItemToServer,
	deleteWishlistItemFromServer,
	getWishlistItemsFromServer,
} from '../../services/wishlistService';

export const getWishlistItems = () => async (dispatch) => {
	try {
		dispatch({
			type: GET_WISHLIST_REQ,
		});

		const data = await getWishlistItemsFromServer();

		dispatch({
			type: GET_WISHLIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_WISHLIST_FAIL,
		});
		toast.error(error);
	}
};

export const addWishlistItem = (body) => async (dispatch) => {
	try {
		dispatch({
			type: ADD_WISHLIST_REQ,
		});

		await addWishlistItemToServer(body);

		dispatch({
			type: ADD_WISHLIST_SUCCESS,
			payload: body,
		});
		toast.success('Added to wishlist successfully');
	} catch (error) {
		console.log(error);
		dispatch({
			type: ADD_WISHLIST_FAIL,
		});
		toast.error(error);
	}
};

export const delWishlistItem = (id) => async (dispatch) => {
	try {
		dispatch({
			type: DEL_WISHLIST_REQ,
		});

		await deleteWishlistItemFromServer(id);

		dispatch({
			type: DEL_WISHLIST_SUCCESS,
			payload: id,
		});
		toast.success('This item removed from wishlist successfully');
	} catch (error) {
		console.log(error);
		dispatch({
			type: DEL_WISHLIST_FAIL,
		});
		toast.error(error);
	}
};
