require("dotenv").config();
const jwt = require("jsonwebtoken");

// validate x-access-token
const authorization = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) res.status(401).send("You must sign in first");
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(400).send("Invalid or expired token");
  }
};

// Check if user is admin
const admin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send("You are not allowed to do this");
  next();
};

// Not found error handler
const notFound = (req, res, next) => {
  const error = new Error("404, Page not found");
  error.status = 404;
  next(error);
};

// catch async errors (try catch)
const catchErrors = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};

// Default error handler
const logErrors = (error, req, res) => {
  res.status(error.status || 500);
  res.send(error.message);
};

module.exports = { authorization, admin, notFound, catchErrors, logErrors };
