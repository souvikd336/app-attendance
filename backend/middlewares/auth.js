const jwt = require('jsonwebtoken')

exports.isLoggedIn = async (req, res, next) => {
    // check token first in cookies
  let token = req.cookies.token || req.localStorage['myKey'];

  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");
  }
  if (!token) {
    return res.status(401).json({
        message: "Login first to access this page",
      });
  }
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  return next();
}