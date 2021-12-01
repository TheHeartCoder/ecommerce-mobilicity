import axios from 'axios';

export const loginUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/login', body);
      resolve(data);
    } catch (error) {
      reject(error.response.data);
      // reject(error.response.data.message);
    }
  });
};

export const registerUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/register', body);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error.response.data);
    }
  });
};

export const activateUser = (activationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put('/api/activate-user', {
        activationId,
      });
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error.response.data);
    }
  });
};

export const forgotPasspowrdReq = () => {};

export const resetPassword = () => {};
