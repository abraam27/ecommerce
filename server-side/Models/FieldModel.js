const DB_Connection = require("../DB_Connection");
var FieldSchema = {
    fieldName: { type: String, required: true },
    location: { type: String, required: true },
    locationOnMap: { type: String, required: true },
    price: { type: String, pattern: "^[0-9]+$", maxLength: 3, minLength: 1, required: true },
    rate: { type: String, pattern: "^[1-5]+$", maxLength: 1, required: true },
    fieldOwnerId: { type: String, pattern: "^[a-zA-Z0-9]*$", required: true },
    fieldOwnerFullName: { type: String, required: true },
    valid: { type: String, pattern: "^[0-1]*$", required: true },
    createdDate: { type: String, pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))", required: true },
    images: [{ type: String }]
}
var Field = DB_Connection.model("Fields", FieldSchema);
module.exports = Field;
