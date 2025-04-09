const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function showAllItems(req, res) {
  const category = req.params.category;
  const items = await db.getAllItems(category);
  res.render("items", { items: items, title: category });
}

function showFormAdd(req, res) {
  res.render("addOrUpdateItem", {
    category: req.params.category,
    formAction: "add",
  });
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
    const category = req.params.category;
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("addOrUpdateItem", {
        category: category,
        errors: errors.array(),
      });
    }
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

async function deleteItem(req, res) {
  const category = req.params.category;
  await db.deleteItem(category, req.body.name);
  res.redirect(`/${category}`);
}

function showFormUpdate(req, res) {
  const values = {
    name: req.query.name,
    price: req.query.price,
    description: req.query.description,
    quantity: req.query.quantity,
  };
  res.render("addOrUpdateItem", {
    category: req.params.category,
    formAction: "update",
    values: values,
  });
}

const updateItem = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const category = req.params.category;
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("addOrUpdateItem", {
        category: category,
        errors: errors.array(),
      });
    }
    await db.updateItem(
      category,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity
    );
    res.redirect(`/${category}`);
  },
];

function deleteCategory() {
  //confirm thing
}

module.exports = {
  showAllItems,
  showFormAdd,
  showFormUpdate,
  addItem,
  deleteItem,
  updateItem,
  deleteCategory,
};
