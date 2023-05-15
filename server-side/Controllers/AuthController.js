const User = require("../Models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("../Configiration/nodeMailer.config");

const Register = async (req, res)=>{
    try {
        const {userName , fullName, email , password , address , phone , role} = req.body;
        var HashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({userName , fullName, email , password:HashedPassword , address , phone , role});
        const foundUser = await User.find({ $or: [{ userName: userName }, { email: email }] });
        if(foundUser.length == 0){
            const savedUser = await newUser.save();
            if (!savedUser){
                res.status(503).json({message:"Sorry , Please try to Register agian"})
            } else {
                const token = jwt.sign({userID:savedUser._id} ,process.env.TOKEN_SIGNATURE );
                nodemailer.sendConfirmationEmail(fullName, email);
                res.header("X-Auth-Token", token);
                res.status(201).json({message:"Done" , savedUser , token });
            }
        }else{
            res.status(400).json({message:"User is Exist !"});
        }
    } catch (error) {
        res.status(500).json({message:"catch error : " + error.message });
    }
}
const login = async (req, res)=>{
    try {
        const {email , password } = req.body ;
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({message:"In-vaild Email"})
        } else {
            if (!user.confirmedEmail) {
                res.status(400).json({message:"Please confrim your Email first "});
            } else {
                const match = await bcrypt.compare(password , user.password);
                if (!match) {
                    res.status(400).json({message:"Email and Password misMatch"});
                } else {
                    const token = jwt.sign({userID:user._id , isLoggedIn:true, role:user.role , userName:user.userName} , process.env.TOKEN_SIGNATURE );
                    res.status(201).json({message:"Login Success" , token});
                }  
            }
        }
    } catch (error) {
        res.status(500).json({message:"Catch Error : " + error.message})
    }
}
const cofrimEmail = async(req, res)=>{
    try {
        const user = await User.findById(req.params['userID']).select('confirmedEmail');
        if (!user) {
            res.status(404).json({message:"In-valid User ID"})
        } else {
            if (user.confirmedEmail) {
                res.status(400).json({message:"You already confrimed"});
            } else {
                await User.findOneAndUpdate({_id:req.params['userID']} , {confirmedEmail:true})
                res.status(200).json({message:"Done Please log In"});
            }
        }
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
    }

}
const SendEmailToChangePassword = async (req, res)=>{
    try{
        await nodemailer.sendEmailToResetPassword(req.params.email);
        res.status(200).json({message:"Email sent"});
    } catch (error) {
        res.status(500).json({message:"Catch Error : " + error.message})
    }
};
const forgetPassword = async(req, res)=>{
    try {
        const {email , newPassword} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({message:"In-valid account"})
        } else {
            const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUND));
            const updatePassword = await User.findByIdAndUpdate({_id:user._id} , {password:hashPassword} , {new:true});
            res.status(200).json({message:"Done update Your Password , Login now" , updatePassword});
        }

    } catch (error) {
        res.status(500).json({message:"Catch Error : " + error.message})
    }
}


module.exports = {
    Register ,
    login,
    cofrimEmail , 
    SendEmailToChangePassword,
    forgetPassword 
}