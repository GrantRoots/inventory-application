const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
  );
  console.log("rows", rows);
  return rows;
}

module.exports = {
  getAllCategories,
};
