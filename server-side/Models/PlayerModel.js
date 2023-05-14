const DB_Connection = require("../DB_Connection");

var PlayerSchema = {
    fullName: { type: String, pattern: "^[a-zA-Z+?\\s]{3,25}$", required: true },
    phone: { type: String, pattern: "^01[0125][0-9]{8}$", required: true },
    birthDate: { type: String, pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))", required: true },
    location: { type: String, pattern: "^[a-zA-Z\s]*$", required: true },
    email: { type: String, pattern: "^[a-zA-Z0-9]+\@[a-zA-Z0-9]+(.com)|(.eg)|(.net)|(.org){1}$", required: true },
    userName: { type: String, required: true },
    password: { type: String, minlength: 8, pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", required: true },
    role: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Active'], required: true },
    createdDate: { type: String, pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))", required: true },
    image: { type: String, required: true }

}
var Player = DB_Connection.model("Players", PlayerSchema);
module.exports = Player;
