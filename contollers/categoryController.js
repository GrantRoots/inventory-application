const db = require("../db/queries");

async function showAllItems(req, res) {
  const category = req.params.category;
  const items = await db.getAllItems(category);
  res.render("items", { items: items, title: category });
}

function showForm(req, res) {
  const category = req.params.category;
  res.render("addItem", { category: category });
}

async function addItem(req, res) {
  const category = req.params.category;
  await db.addItem(
    category,
    req.body.name,
    req.body.price,
    req.body.description,
    req.body.quantity
  );
}

function deleteItem() {}

function deleteCategory() {
  //confirm thing
}

module.exports = {
  showAllItems,
  showForm,
  addItem,
  deleteItem,
  deleteCategory,
};
