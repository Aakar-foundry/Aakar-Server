const { login, register, verifyEmployee, reSendOTP, forgotPasswordEmployeeVerify, forgotPassword } = require("../Controller/AuthController");

const router = require("express").Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyEmployee/:employeeId").post(verifyEmployee);
router.route("/reSendOTP/:userId").get(reSendOTP);
router.route("/forgotPasswordEmployeeVerify").post(forgotPasswordEmployeeVerify);
router.route("/forgotPassword/:userId").post(forgotPassword);

module.exports = router;