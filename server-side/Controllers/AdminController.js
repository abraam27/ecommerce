// const AdminValidate = require("../Utils/AdminValidation");
const AdminServices = require("../Services/AdminServices");
const bcrypt= require("bcrypt");

var AddNewAdmin = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    var newAdmin = new AdminServices(req.body.adminName, req.body.userName, HashedPassword, "Admin");
    if(await newAdmin.AddAdmin()){
        res.status(201).send("Add Successfully !");
    }else{
        res.status(400).send("Not Added !");
    }
};
module.exports = {
    AddNewAdmin
};