const express = require("express");
const categoryRouter = express.Router({ mergeParams: true });
const categoryController = require("../contollers/categoryController");

categoryRouter.get("/", categoryController.showAllItems);

module.exports = categoryRouter;
