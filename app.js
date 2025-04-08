const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/:category", categoryRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
