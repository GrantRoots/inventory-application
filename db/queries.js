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

module.exports = {
  getAllCategories,
  getAllItems,
};
