exports.NewEmployeeRegisterOTPEmailTemplete = (otp) => {
    return "Here is your OTP to verify your account: " + otp;
};
exports.EmployeeForgotPasswordEmailTemplete = (otp) => {
    return "Here is your OTP to Change password: " + otp;
}