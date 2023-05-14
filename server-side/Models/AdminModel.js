const DB_Connection = require("../DB_Connection");
var AdminSchema = {
    
    adminName:{type:String,pattern:"^[a-zA-Z\s\.]*$",required:true},
    userName:{type:String, required:true},
    password:{type:String,minlength:5, required:true},
    role:{type:String},
    status: { type: String, default:'Active'},

}
var Admin = DB_Connection.model("Admin",AdminSchema);
module.exports = Admin;
