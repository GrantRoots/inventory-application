const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
  );
  return rows;
}

async function getAllItems(category) {
  console.log("category", category);
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

module.exports = {
  getAllCategories,
  getAllItems,
  addItem,
};
