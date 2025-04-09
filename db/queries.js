const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
  );
  return rows;
}

async function getAllItems(category) {
  const { rows } = await pool.query(`SELECT * FROM ${category}`);
  return rows;
}

async function addItem(category, name, price, description, quantity) {
  const values = [name, price, description, quantity];
  await pool.query(
    `INSERT INTO ${category} (name, price, description, quantity) VALUES($1, $2, $3, $4);`,
    values
  );
}

async function deleteItem(category, name) {
  await pool.query(`DELETE FROM ${category} WHERE name = '${name}';`);
}

async function deleteCategory(category) {}

module.exports = {
  getAllCategories,
  getAllItems,
  addItem,
  deleteItem,
  deleteCategory,
};
