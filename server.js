const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
require("./db/conn.js");
const users = require("./models/userSchema.js");
const router = require("./routes/router.js");
const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running in PORT${PORT}`);
});
