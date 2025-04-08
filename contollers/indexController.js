const db = require("../db/queries");

async function showCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories });
}

module.exports = {
  showCategories,
};
