const { NewEmployeeRegisterOTPEmailTemplete, EmployeeForgotPasswordEmailTemplete } = require("../Helper/EmailReponse");
const { EMPLOYEE } = require("../Helper/Role-Constant");
const Employee = require("../Model/Employee");
const VerificationCode = require("../Model/VerificationCode")

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ error: true, message: "Please provide Email" });
        }
        if (!password) {
            return res.status(400).json({ error: true, message: "Please provide Password" });
        }
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ error: true, message: "User doesn't exist" });
        }
        if (!employee.verified) {
            return res.status(400).json({ error: true, message: "User is not verified" });
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Invalide Credentials" });
        }
        const token = getJwtToken({ id: employee._id, email });

        const response = {
            id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            Role: employee.Role,
            profilePic: employee.profilePic,
            verified: employee.verified,
            token
        }
        return res.status(200).json(success("Login Successful", response))
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally {
        console.log("Checked in employee : " + email);
    }
}

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const isEmployeeExist = await Employee.findOne({
            email
        })
        if (isEmployeeExist) {
            return res.status(400).json({ error: true, message: "User already exist" });
        }
        const employee = await Employee.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            Role: EMPLOYEE,
            verified: false
        });

        const generatedOTP = generateOTP(6);
        await VerificationCode.create({
            employeeID: employee._id,
            code: generatedOTP,
            verifyed: false
        })

        const isEmailSent = await sendMail({ email, firstName }, NewEmployeeRegisterOTPEmailTemplete(generatedOTP))
        if (isEmailSent === null) {
            return res.status(200).json(success("Employee is register successfully but we are facing some email issue. Please try to login and verify your account.", { id: employee._id }))
        }
        return res.status(200).json(success("Employee is register successfully", { id: user._id }))
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally {
        console.log("Checked in employee : " + email);
    }
}

exports.verifyEmployee = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const { code } = req.body;
        if (!employeeId || !code) {
            return res.status(400).json({ error: true, message: "Invalide" });
        }
        const verificationCode = await VerificationCode.findOne({ employeeID: employeeId });
        if (!verificationCode.CreatedAt) {
            return res.status(400).json({ error: true, message: "Verification Code expried" });
        }
        if (verificationCode.code !== code) {
            return res.status(400).json({ error: true, message: "Invalide Code" });
        }
        await Employee.updateOne({
            _id: employeeId
        }, {
            verified: true
        })
        await VerificationCode.updateOne({
            employeeID: employeeId
        }, {
            verified: true
        })
        return res.status(200).json(success("Employee verified", { id: user._id }))
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally {

    }
}

exports.reSendOTP = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findOne({ _id: employeeId })
        const generatedOTP = generateOTP(6);
        await VerificationCode.updateOne(
            {
                employee: employeeId
            }
            , {
                code: generatedOTP,
                verifyed: false
            })

        const isEmailSent = await sendMail({ email: employee.email, firstName: employee.firstName }, NewEmployeeRegisterOTPEmailTemplete(generatedOTP))
        if (isEmailSent === null) {
            return res.status(200).json(success("We are failed to send otp. Please try again sending new otp.", { id: employeeId }))
        }

        return res.status(200).json(success("OTP is send successfully", { id: employeeId }))

    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally {

    }
}

exports.forgotPasswordEmployeeVerify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ error: true, message: "User doesn't exist" });
        }
        if (!employee.verified) {
            return res.status(400).json({ error: true, message: "User is not verified" });
        }
        const generatedOTP = generateOTP(6);
        await VerificationCode.updateOne(
            {
                employee: employeeId
            }
            , {
                code: generatedOTP,
                verifyed: false
            })
        const isEmailSent = await sendMail({ email: employee.email, firstName: employee.firstName }, EmployeeForgotPasswordEmailTemplete(generatedOTP))
        if (isEmailSent === null) {
            return res.status(200).json(success("we are facing some email issue.", { id: employee._id }))
        }
        return res.status(200).json(success("sucess otp is sended", { id: employee._id }));
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally {

    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        const { employeeID } = req.params;
        const { newPassword, rePassword } = req.body;
        if (!newPassword || !rePassword) {
            return res.status(400).json({ error: true, message: "Invalid data" });
        }
        const verificationCode = await VerificationCode.findOne({employeeID:employeeID});
        if(!verificationCode.verifyed){
            return res.status(400).json({ error: true, message: "User is not verified" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(newPassword, salt);
        await Employee.updateOne({ _id: employeeID }, { password: hashpassword })

        return res.status(200).json(success("Password is succesfully changed", { id: employeeID }));
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally {

    }
}