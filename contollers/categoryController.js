const db = require("../db/queries");

async function showAllItems(req, res) {
  console.log(req.params.category, "req.params");
  const category = req.params.category;
  const items = await db.getAllItems(category);
  console.log(items);
  res.render("items", { items: items, title: category });
}

function addItem() {}

function deleteItem() {}

function deleteCategory() {
  //confirm thing
}

module.exports = {
  showAllItems,
  addItem,
  deleteItem,
  deleteCategory,
};
