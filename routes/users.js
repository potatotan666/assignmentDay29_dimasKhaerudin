const express = require("express");
const router = express.Router();
const fs = require("fs");
const db = require("../config/db");

router.get("/", function (req, res, next) {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    res.status(200).json(row);
  });
});

// post data to users.json
router.post("/", function (req, res, next) {
  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  users.push(req.body);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  res.status(201).json(req.body);
});

// post data to db
router.post("/create-db", function (req, res, next) {
  const query =
    "INSERT INTO users (username, firstName, lastName, email, password, phone, userStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const body = req.body;
  db.run(
    query,
    [
      body.username,
      body.firstName,
      body.lastName,
      body.email,
      body.password,
      body.phone,
      body.userStatus,
    ],
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
  res.status(201).json({ message: "Success create new data!" });
});

// Find user in users.json by username
router.get("/:id", function (req, res, next) {
  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  const params = req.params.id;
  const findId = users.find((users) => users.username == params);
  // res.status(200).json(findId);
  if (findId) {
    res.status(200).json(findId);
  } else {
    res.status(404).json({ message: "Data Not Found" });
  }
});

// Update Phone number in db
router.put("/:id", function (req, res, next) {
  const query = "UPDATE users SET phone = ? WHERE username = ?";
  const username = req.params.id;
  const body = req.body;
  db.run(query, [body.phone, username], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success update new data!" });
});

// delete data from db
router.delete("/:id", function (req, res, next) {
  const query = "DELETE from users WHERE username = ?";
  const username = req.params.id;

  db.run(query, [username], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success delete new data!" });
});

module.exports = router;
