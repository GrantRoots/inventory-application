const db = require("../db/queries");

async function showFood(req, res) {
  const food = await db.getAllItems("food");
  console.log(food);
  res.render("food", { food: food });
}

function addItem() {}

function deleteItem() {}

function deleteCategory() {
  //confirm thing
}

module.exports = {
  showFood,
  addItem,
  deleteItem,
  deleteCategory,
};
