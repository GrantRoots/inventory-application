const express = require("express");
const categoryRouter = express.Router({ mergeParams: true });
const categoryController = require("../contollers/categoryController");

categoryRouter.get("/", categoryController.showAllItems);
categoryRouter.get("/add", categoryController.showForm);
categoryRouter.post("/add", categoryController.addItem);

module.exports = categoryRouter;
