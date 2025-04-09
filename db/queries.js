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

async function updateItem(category, name, price, description, quantity) {
  const values = [name, price, description, quantity];
  await pool.query(
    `UPDATE ${category} SET name = $1, price = $2, description = $3, quantity = $4 WHERE name = $1;`,
    values
  );
}

async function deleteCategory(category) {}

module.exports = {
  getAllCategories,
  getAllItems,
  addItem,
  deleteItem,
  updateItem,
  deleteCategory,
};
