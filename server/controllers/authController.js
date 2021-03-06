import User from '../models/user';
import Otp from '../models/otp';

import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send('Password is required and should be min 6 characters long');
    }
    let userExist = await User.findOne({ email });
    if (userExist) return res.status(400).send('Email is exist');

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    // prepare for email
    const activationLink = `${process.env.CLIET_URL}/login?activation=${createdUser._id}`;
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
                <html>
                  <h1>Click <a target='_blank' href=${activationLink}>here</a> to activate your account</h1>
                  <p>Thank You :)</p>
                </html>
              `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Account Activation Procedure',
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        res.json({ ok: true });
      })
      .catch(async (err) => {
        console.log(err);
        await User.findByIdAndDelete(createdUser._id);
        return res
          .status(500)
          .send(
            'Error. Try again. We are unable to send email to your email address'
          );
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error. Try again.');
  }
};

export const activateUserAccount = async (req, res) => {
  try {
    const id = req.body.activationId;
    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');
    if (user.status === 'active')
      return res.status(400).send('User is already active');
    user.status = 'active';
    await user.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).send('Error. Try again.');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send('Invalid email or password');

    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error. Try again.');
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({ message: 'Signout success' });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email');

    const shortCode = nanoid(6).toUpperCase();
    await Otp.findOneAndUpdate(
      { user: user._id },
      { resetPasswordOtp: shortCode },
      { upsert: true, useFindAndModify: false }
    );

    // prepare for email
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
                <html>
                  <h1>Reset password</h1>
                  <p>User this <strong>OTP</strong> to reset your password</p>
                  <h2 style="color:red;">${shortCode}</h2>
                  <p style="color:blue;">This OTP is valid upto 10 minutes</p>
                </html>
              `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Reset Password',
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        res.json({ ok: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpExist = await Otp.findOne({ resetPasswordOtp: otp });
    if (!otpExist) return res.status(400).send('Invalid OTP');
    const hashedPassword = await hashPassword(newPassword);

    await User.findOneAndUpdate(
      {
        email,
      },
      {
        password: hashedPassword,
      }
    );

    await Otp.findOneAndDelete({ resetPasswordOtp: otp });
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error! Try again.');
  }
};

export const currentAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role === 'Admin') return res.status(400).send('Invalid');
    if (!user) return res.status(404).send('User not found');
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).send('Error. Try again.');
  }
};

export const currentCustomer = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role === 'Customer' || user.status !== 'active')
      return res.status(400).send('Invalid');

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).send('Error. Try again.');
  }
};
