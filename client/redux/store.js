import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import axios from 'axios';
import { loginReducer } from './reducers/authReducer';
import { useDispatch } from 'react-redux';
import { categoryReducer } from './reducers/categoryReducer';
import { brandReducer } from './reducers/brandReducer';
import { bannerReducer } from './reducers/bannerReducer';
import { productReducer } from './reducers/productReducer';
import { couponReducer } from './reducers/couponReducer';
import { cartReducer } from './reducers/cartReducer';
import { addressReducer } from './reducers/addressReducer';
import { wishlistReducer } from './reducers/wishlistReducer';

const reducers = combineReducers({
	loggedInUser: loginReducer,
	categoryData: categoryReducer,
	brandData: brandReducer,
	productData: productReducer,
	bannerData: bannerReducer,
	couponData: couponReducer,
	cartData: cartReducer,
	addressData: addressReducer,
	wishlistData: wishlistReducer,
});

const userInfoFromStorage =
	typeof window !== 'undefined' &&
	window.localStorage.getItem('_usr_mobilicity')
		? JSON.parse(localStorage.getItem('_usr_mobilicity'))
		: null;

const initialState = {
	loggedInUser: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const makeStore = () => {
	axios.interceptors.response.use(
		function (response) {
			// any status code that lie within the range of 2XX cause this function
			// to trigger
			return response;
		},
		function (error) {
			// any status codes that falls outside the range of 2xx cause this function
			// to trigger
			let res = error.response;
			if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
				return new Promise((resolve, reject) => {
					const dispatch = useDispatch();
					axios
						.get('/api/logout')
						.then((data) => {
							console.log('/401 error > logout');
							dispatch({ type: 'LOGOUT' });
							window.localStorage.removeItem('_usr_mobilicity');
							window.location.reload();
						})
						.catch((err) => {
							console.log('AXIOS INTERCEPTORS ERR', err);
							reject(error);
						});
				});
			}
			return Promise.reject(error);
		}
	);

	return createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	);
};

export const wrapper = createWrapper(makeStore);
