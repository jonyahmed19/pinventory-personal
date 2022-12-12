const express = require("express");
const router = express.Router();

const {
  registerUserController,
} = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");

/**
 * Auth releated
 */
router.post("/register", registerUserController);
router.post("/login", loginController);

module.exports = router;
