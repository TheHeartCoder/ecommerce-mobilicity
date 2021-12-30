import expressJwt from 'express-jwt';
import User from '../models/user';
export const authTokenVerify = expressJwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === 'Admin') {
    next();
  } else {
    res.status(401).send('You are not authorized to perform this action');
  }
};

export const isCustomer = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === 'Customer') {
    next();
  } else {
    res.status(401).send('You are not authorized to perform this action');
  }
};
