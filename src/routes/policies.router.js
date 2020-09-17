const express = require("express");

const gdprController = require("../controllers/gdpr.controller");
const { authorization, admin } = require("../middlewares");
// const { catchErrors } = require("../../middlewares"); // Remove try and catch blocks in tasks.router and use middleware instead
const policiesRouter = express.Router();

policiesRouter
  .route("/cookie")
  .get(authorization, gdprController.getCookiePolicy);
policiesRouter
  .route("/privacy")
  .get(authorization, gdprController.getPrivacyPolicy);
policiesRouter.route("/me").get(authorization, gdprController.getUserInfo);

module.exports = policiesRouter;
