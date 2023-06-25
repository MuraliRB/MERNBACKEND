const express = require("express");
const users = require("../models/userSchema.js");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Connect");
});

router.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { name, age, email, password } = req.body;
  if (!name || !age || !email || !password) {
    res.status(404).send("Please fill the fields");
  }
  try {
    const existUser = await users.findOne({ email: email });
    if (existUser) {
      res.status(404).send("User with this mail already exists");
    } else {
      const addUser = new users({
        name,
        age,
        email,
        password,
      });
      await addUser.save();
      res.status(201).json(addUser);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//getuser

router.get("/api/getdata", async (req, res) => {
  try {
    const getUser = await users.find();
    res.status(201).json(getUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
