const User = require("../models/admin");
const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");
const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    req.session.isAuth = false;
    throw new UnauthenticatedError("Invalid Credentials");
  }

  if (password !== user.password) {
    req.session.isAuth = false;
    throw new UnauthenticatedError("Invalid Credentials");
  }

  req.session.isAuth = true;

  res.status(StatusCodes.OK).json(req.session.isAuth);
};

const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;

    res.status(StatusCodes.OK).send("logged out");
  });
};

module.exports = { Login, Logout };
