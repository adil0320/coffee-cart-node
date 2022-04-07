const User = require('../models/user');
const HttpError = require('../models/http-error');

const createUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    return next(new HttpError(error.message, error.code || 500));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: 'User Successfully Logged out' });
  } catch (error) {
    return next(new HttpError('Something Went Wrong', 500));
  }
};

module.exports = {
  createUser,
  login,
  logout,
};
