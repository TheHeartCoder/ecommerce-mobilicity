import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import axios from 'axios';
import { loginReducer } from './reducers/authReducer';

const reducers = combineReducers({
  // contacts: contactReducer,
  loggedInUser: loginReducer,
});
const userInfoFromStorage =
  typeof window !== 'undefined' &&
  window.localStorage.getItem('_usr_mobilicity')
    ? JSON.parse(localStorage.getItem('_usr_mobilicity'))
    : null;

const initialState = { loggedInUser: { userInfo: userInfoFromStorage } };

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
          axios
            .get('/api/logout')
            .then((data) => {
              console.log('/401 error > logout');
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('usr_mobilicity');
              router.push('/login');
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
