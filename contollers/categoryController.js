const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function showAllItems(req, res) {
  const category = req.params.category;
  const items = await db.getAllItems(category);
  res.render("items", { items: items, title: category });
}

function showForm(req, res) {
  const category = req.params.category;
  res.render("addItem", { category: category });
}

const validateItem = [
  body("name")
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage("Must only contain letters"),
  body("price").trim().notEmpty().isFloat({ min: 0.01, max: 9999.99 }),
  body("description").trim().notEmpty().isLength({ min: 1, max: 255 }),
  body("quantity").trim().notEmpty().isInt({ min: 1 }),
];

const addItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("addItem", {
        category: req.params.category,
        errors: errors.array(),
      });
    }
    const category = req.params.category;
    await db.addItem(
      category,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity
    );
    res.redirect(`/${category}`);
  },
];

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
