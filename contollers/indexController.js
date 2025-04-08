const db = require("../db/queries");

function showCategories(req, res) {
  res.render("index", { categories: categories });
}

module.exports = {
  showCategories,
};
