const DB_Connection = require("../DB_Connection");
var GameSchema = {
    userId:{type:String,required:true},
    userFullName:{type:String,pattern:"^[a-zA-Z\\s]+$",required:true},
    fieldId:{type:String,required:true},
    fieldName:{type:String, required:true},
    date:{type:String,pattern:"(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))",required:true },
    hour:{type:Number,max:23,min:0,required:true },
    price:{type:String,pattern:"^[1-9]*$",required:true},
    rate:{type:String,pattern:"^[1-5]*$"},
    comment:{type:String,pattern:"^[A-Za-z0-9\s]*$"},
    complain:{type:String,pattern:"^[A-Za-z0-9\s]*$"}
}
var Game = DB_Connection.model("Games",GameSchema);
module.exports = Game;
