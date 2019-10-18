const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../users/usersModel.js");
const secrets = require("../database/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  usersModel
    .add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "Cannot add the user", error });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  usersModel
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `${user.username} is signed in`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id
  };
  const options = {
    expiresIn: "3h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
