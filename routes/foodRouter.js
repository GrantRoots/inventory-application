const express = require("express");
const foodRouter = express.Router();
const foodController = require("../contollers/foodController");

foodRouter.get("/", foodController.showFood);

module.exports = foodRouter;
