const CourseValidate = require("../Utils/CourseValidation");
const CourseServices = require("../Services/CourseServices");
var GetAllCourses = async (req, res)=>{
    res.status(200).json(await CourseServices.GetAllCourses());
};
var GetCourseByID = async (req, res)=>{
    res.status(200).json(await CourseServices.GetCourseByID(req.params.id));
};
var AddNewCourse = (req, res)=>{
    var newCourse = new CourseServices(req.body.courseName, req.body.courseDuration);
    if(CourseValidate(newCourse)){
        if(newCourse.AddCourse()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var UpdateCourse = (req, res)=>{
    var updatedCourse = new CourseServices(req.body.courseName, req.body.courseDuration);
    if(CourseValidate(updatedCourse)){
        if(updatedCourse.UpdateCourse(req.params.id)){
            res.status(201).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var DeleteCourse = async (req, res)=>{
    if(CourseServices.DeleteCourse(req.params.id)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
module.exports = {
    GetAllCourses,
    GetCourseByID,
    AddNewCourse,
    UpdateCourse,
    DeleteCourse
};