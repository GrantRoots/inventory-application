const express = require("express");
const categoryRouter = express.Router({ mergeParams: true });
const categoryController = require("../contollers/categoryController");

categoryRouter.get("/", categoryController.showAllItems);
categoryRouter.get("/add", categoryController.showFormAdd);
categoryRouter.post("/add", categoryController.addItem);
categoryRouter.post("/delete", categoryController.deleteItem);
categoryRouter.get("/update", categoryController.showFormUpdate);
categoryRouter.post("/update", categoryController.updateItem);
categoryRouter.post("/deletecategory", categoryController.deleteCategory);

module.exports = categoryRouter;
