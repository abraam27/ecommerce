const bcrypt= require("bcrypt");
const User = require("../Models/UserModel");
const fs = require('fs');
const path = require('path');
const GetAllUsers = async (req, res)=>{
    try{
        let allUser = await User.find({deleted: false})
        if(allUser.length !== 0){
            res.status(200).json(allUser);
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.mesage})
    }
};
const GetUserByID = async (req, res)=>{
    try{
        let User = await User.findOne({_id: req.params['UserID'], deleted: false});
        if(User){
            res.status(200).json({User})
        }
        else{
            res.status(400).json({message: 'May Wrong in User ID or This User Not Exist'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
};
const UpdateUser = async (req, res) => {
    try{
        let user = await User.findOneAndUpdate({_id: req.params['userID']}, {...req.body}, {new:true});
        if(user){
            res.status(200).json({user})
        }
        else{
            res.status(400).json({message: 'May Wrong in User ID or This User Not Exist'})
        } 
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
};
const UpdatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findOneById(req.params['userID']);
        if (!user) {
            res.status(200).json({ message: "sorry not a user" });
        }
        else {
            const checkPassword = await bcrypt.compare(oldPassword, user.password)
            if (!checkPassword) {
                res.status(200).json({ message: "password is miss match" });
            } else {
                if (newPassword != confirmPassword) {
                    res.status(200).json({ message: "confirm password not match new password" });
                } else {
                    const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUND));
                    const updatePassword = await User.findByIdAndUpdate({ _id }, { password: hashPassword }, { new: true });
                    res.status(201).json({ message: "changed successfully", updatePassword });
                }
            }
        }
    } catch (err) {
        res.status(400).json({ message: "Catch Error : " + err.message })
    }
};
const DeleteUser = async (req, res)=>{
    try{
        let userDeleted = await User.findByIdAndUpdate(req.params['productID'], {deleted: true}, {new: true});
        if(userDeleted){
            res.status(200).json({message: 'This User Is Deleted Successfuly.'});
        }else{
            res.status(400).json({message: 'May Wrong in User ID or This User Not Exist'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
};
module.exports = {
    GetAllUsers,
    GetUserByID,
    UpdateUser,
    UpdatePassword,
    DeleteUser
}