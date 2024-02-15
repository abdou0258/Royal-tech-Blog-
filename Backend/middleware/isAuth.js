const { StatusCodes } = require("http-status-codes");
const isAuth = (req, res, next) => {

  if (req.session.isAuth) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send("you are unauthorized to access this route");
  }
};
module.exports = isAuth;
