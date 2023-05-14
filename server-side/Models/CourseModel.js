const DB_Connection = require("../DB_Connection");
var CourseSchema = {
    courseName:{type:String,pattern:"^[a-zA-Z]+$", required:true},
    courseDuration:{ type:Number, max:30 },
}
var Course = DB_Connection.model("Courses",CourseSchema);


module.exports = Course;
