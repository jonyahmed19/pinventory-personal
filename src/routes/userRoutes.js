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
const forgetPasswordController = require("../controllers/auth/forgetPasswordController");
const getUserController = require("../controllers/auth/getUserController");
const loginStatusController = require("../controllers/auth/loginStatusController");
const resetPasswordController = require("../controllers/auth/resetPasswordController");

/**
 * Public Routes
 */
router.post("/register", registerUserController);
router.post("/login", loginController);
router.get("/logout", logOutController);
router.get("/loggedin", loginStatusController);

/***
 * Private Routes
 */
router.patch("/updateuser", protected, updateController);
router.patch("/changepassword", protected, changepasswordController);
router.patch("/forgetpassword", protected, forgetPasswordController);
router.patch("/resetpassword/:resetToken", protected, resetPasswordController);
router.get("/getuser", protected, getUserController);

module.exports = router;
