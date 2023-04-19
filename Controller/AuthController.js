const { NewEmployeeRegisterOTPEmailTemplete } = require("../Helper/EmailReponse");
const { EMPLOYEE } = require("../Helper/Role-Constant");
const Employee = require("../Model/Employee");
const VerificationCode = require("../Model/VerificationCode")

exports.login=async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        if (!email ) {
            return res.status(400).json({ error: true, message: "Please provide Email" });
        }
        if (!password ) {
            return res.status(400).json({ error: true, message: "Please provide Password" });
        }
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ error: true, message: "User doesn't exist" });
        }
        if(!employee.verified){
            return res.status(400).json({ error: true, message: "User is not verified" });
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Invalide Credentials" });
        }
        const token = getJwtToken({id: employee._id , email});

        const response ={
            id:employee._id,
            firstName:employee.firstName,
            lastName:employee.lastName,
            email:employee.email,
            Role:employee.Role,
            profilePic:employee.profilePic,
            verified: employee.verified,
            token
        }
        return res.status(200).json(success("Login Successful", response))
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error.message });
    }
    finally{
        console.log("Checked in employee : "+email);
    }
}

exports.register=async(req, res, next)=>{
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
            code: generatedOTP
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
    finally{
        console.log("Checked in employee : "+email);
    }
}

exports.verifyUser=async(req, res, next)=>{
    try {
        
    } 
    catch (error) {
        
    }
    finally{
        
    }
}

exports.sendOTP=async(req, res, next)=>{
    try {
        
    }
    catch (error) {
        
    }
    finally{
        
    }
}

exports.forgotPasswordUserVerify=async(req, res, next)=>{
    try {
        
    } 
    catch (error) {
        
    }
    finally{
        
    }
}

exports.forgotPassword=async(req, res, next)=>{
    try {
        
    } 
    catch (error) {
        
    }
    finally{
        
    }
}