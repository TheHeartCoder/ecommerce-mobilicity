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

export const forgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post('/api/forgot-password', { email });
      resolve(true);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const resetPassword = (form) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/reset-password', form);
      resolve(data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('/api/logout');
      resolve(data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};
