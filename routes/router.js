const express = require("express");
const users = require("../models/userSchema.js");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Connect");
});

//Insert User

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

//getAllUser

router.get("/api/getdata", async (req, res) => {
  try {
    const getUser = await users.find();
    res.status(201).json(getUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

//getIndividualUser

router.get("/api/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const individualUser = await users.findById({ _id: id });
    res.status(201).json(individualUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

//updateUser

router.patch("/api/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//deleteUser

router.delete("/api/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await users.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
