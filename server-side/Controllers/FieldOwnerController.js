const FieldOwnerValidate = require("../Utils/FieldOwnerValidation");
const FieldOwnerServices = require("../Services/FieldOwnerServices");
const bcrypt= require("bcrypt");

var GetAllFieldOwners = async (req, res)=>{
    res.status(200).json(await FieldOwnerServices.GetAllFieldOwners());
};
var GetFieldOwnerByID = async (req, res)=>{
    res.status(200).json(await FieldOwnerServices.GetFieldOwnerByID(req.params.fieldOwnerID));
};
var AddNewFieldOwner = async (req, res)=>{
    if(FieldOwnerValidate(req.body)){
        var HashedPassword = await bcrypt.hash(req.body.password,10);
        var date = new Date();
        var month = (date.getMonth() + 1)<10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        var newFieldOwner = new FieldOwnerServices(req.body.fullName, req.body.phone, req.body.email, req.body.userName, HashedPassword,"FieldOwner","Pending",currentDate,"Default_Image.jpg");
        if(await newFieldOwner.AddFieldOwner()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(FieldOwnerValidate.errors);
    }
};
var UpdateFieldOwner = async (req, res)=>{
    var updatedFieldOwner = new FieldOwnerServices(req.body.fullName, req.body.phone,req.body.email, req.body.userName);
    if(FieldOwnerValidate(updatedFieldOwner)){
        if(await updatedFieldOwner.UpdateFieldOwner(req.params.fieldOwnerID)){
            res.status(201).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(FieldOwnerValidate.errors);
    }
};
var DeleteFieldOwner = async (req, res)=>{
    if(await FieldOwnerServices.DeleteFieldOwner(req.params.fieldOwnerID)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
var UpdateFieldOwnerImage = async (req, res)=>{  
    var updateFieldOwner = await FieldOwnerServices.UpdateFieldOwnerImage(req.params.fieldOwnerID,req.file.filename)
    if(updateFieldOwner){
        res.status(200).json(updateFieldOwner);
    }else{
        res.status(400).send("Not Updated !");
    }
};

module.exports = {
    GetAllFieldOwners,
    GetFieldOwnerByID,
    AddNewFieldOwner,
    UpdateFieldOwner,
    DeleteFieldOwner,
    UpdateFieldOwnerImage
};