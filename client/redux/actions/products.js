import toast from 'react-hot-toast';
import {
	addProductToServer,
	delProductFromServer,
	getProductFromServer,
	getProductsFromServer,
	updateProductToServer,
} from '../../services/productService';

import {
	GET_SINGLE_PRODUCT_FAIL,
	GET_SINGLE_PRODUCT_REQ,
	GET_SINGLE_PRODUCT_SUCCESS,
	ADD_PRODUCT_REQ,
	ADD_PRODUCT_SUCCESS,
	DEL_PRODUCT_REQ,
	DEL_PRODUCT_SUCCESS,
	GET_PRODUCT_REQ,
	GET_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_REQ,
	GET_PRODUCT_FAIL,
	UPDATE_PRODUCT_SUCCESS,
	DEL_PRODUCT_FAIL,
	UPDATE_PRODUCT_FAIL,
	ADD_PRODUCT_FAIL,
} from '../constants/product';

export const addProduct = (body) => async (dispatch) => {
	try {
		dispatch({
			type: ADD_PRODUCT_REQ,
		});
		const data = await addProductToServer(body);

		dispatch({
			type: ADD_PRODUCT_SUCCESS,
		});
		toast.success('Product added successfully');
	} catch (error) {
		dispatch({
			type: ADD_PRODUCT_FAIL,
		});
		toast.error(error);
	}
};

export const updateProduct = (slug, body) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATE_PRODUCT_REQ,
		});
		const data = await updateProductToServer(slug, body);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
		});
		toast.success('Product updated successfully');
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
		});
		toast.error(error);
	}
};

export const deleteProduct = (slug) => async (dispatch) => {
	try {
		dispatch({
			type: DEL_PRODUCT_REQ,
		});
		const data = await delProductFromServer(slug);

		dispatch({
			type: DEL_PRODUCT_SUCCESS,
		});
		toast.success('Brand deleted successfully');
	} catch (error) {
		dispatch({
			type: DEL_PRODUCT_FAIL,
		});
		toast.error(error);
	}
};

export const getProducts =
	(page = '', limit = '', sort = '', order = '', keyword = '') =>
	async (dispatch) => {
		try {
			dispatch({
				type: GET_PRODUCT_REQ,
			});
			const data = await getProductsFromServer(
				page,
				limit,
				sort,
				order,
				keyword
			);

			dispatch({
				type: GET_PRODUCT_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: GET_PRODUCT_FAIL,
			});
			toast.error(error);
		}
	};

export const getProduct = (slug) => async (dispatch) => {
	try {
		dispatch({
			type: GET_SINGLE_PRODUCT_REQ,
		});
		const data = await getProductFromServer(slug);

		dispatch({
			type: GET_SINGLE_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_SINGLE_PRODUCT_FAIL,
		});
		toast.error(error);
	}
};
