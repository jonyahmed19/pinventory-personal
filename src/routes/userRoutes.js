const express = require("express");
const router = express.Router();

const {
  registerUserController,
} = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const logOutController = require("../controllers/auth/logoutController");
const updateController = require("../controllers/auth/updateController");
const { protected } = require("../helpers/token");
const changepasswordController = require("../controllers/auth/changepassController");

/**
 * Auth releated
 */
router.post("/register", registerUserController);
router.post("/login", loginController);
router.get("/logout", logOutController);
router.patch("/updateuser", protected, updateController);
router.patch("/changepassword", protected, changepasswordController);

module.exports = router;
