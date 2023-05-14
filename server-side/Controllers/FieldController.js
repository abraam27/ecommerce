const FieldValidate = require("../Utils/FieldValidation");
const FieldServices = require("../Services/FieldServices");
var GetAllFields = async (req, res)=>{
    res.status(200).json(await FieldServices.GetAllFields());
};
var GetFieldByID = async (req, res)=>{
    res.status(200).json(await FieldServices.GetFieldByID(req.params.fieldID));
};
var GetFieldAndCalenderByFieldID = async (req, res)=>{
    res.status(200).json(await FieldServices.GetFieldAndCalenderByFieldID(req.params.fieldID));
};
var GetFieldsByValidation = async (req, res)=>{
    res.status(200).json(await FieldServices.GetFieldsByValidation(req.params.valid));
};
var GetAllFieldsByFieldOwnerID = async (req, res)=>{
    res.status(200).json(await FieldServices.GetAllFieldsByFieldOwnerID(req.params.fieldOwnerID));
};
var AddNewField = async(req, res)=>{
    var date = new Date();
    var month = (date.getMonth() + 1)<10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
    var day = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
    var currentDate = `${date.getFullYear()}/${month}/${day}`;
    var images = [];
    if(req.files)
    req.files.map((i)=> images.push(i.filename));
    var newField = new FieldServices(req.body.fieldName,req.body.location,req.body.locationOnMap,req.body.price,req.body.fieldOwnerId,req.body.fieldOwnerFullName,"3","0",currentDate,images);
    if(FieldValidate(newField)){
        if(await newField.AddField()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(FieldValidate.errors);
    }
};
var UpdateField = async (req, res)=>{
    var updatedField = new FieldServices(req.body.fieldName,req.body.location,req.body.locationOnMap,req.body.price,req.body.fieldOwnerId,req.body.fieldOwnerFullName);
    if(FieldValidate(updatedField)){
        if(await updatedField.UpdateField(req.params.fieldID)){
            res.status(201).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(FieldValidate.errors);
    }
};
var DeleteField = async (req, res)=>{
    if(await FieldServices.DeleteField(req.params.fieldID)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
var UpdateFieldStatus = async (req, res)=>{
    if(await FieldServices.UpdateFieldStatus(req.params.fieldID)){
        res.status(201).send("Status Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var AddFieldImages = async (req, res)=>{
    var images = await FieldServices.GetFieldImagesByFieldID(req.params.fieldID);
    var images = images[0].images;
    if(req.files)
    req.files.map((i)=> images.push(i.filename));
    if(await FieldServices.AddFieldImages(req.params.fieldID, images)){
        res.status(201).send("Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var DeleteFieldImage = async (req, res)=>{
    if(await FieldServices.DeleteFieldImage(req.params.fieldID, req.params.imageName)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
module.exports = {
    GetAllFields,
    GetFieldByID,
    GetFieldAndCalenderByFieldID,
    AddNewField,
    UpdateField,
    DeleteField,
    GetAllFieldsByFieldOwnerID,
    GetFieldsByValidation,
    UpdateFieldStatus,
    AddFieldImages,
    DeleteFieldImage
};