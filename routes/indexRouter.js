const express = require("express");
const indexRouter = express.Router();
const indexController = require("../contollers/indexController");

indexRouter.get("/", indexController.showCategories);

module.exports = indexRouter;
