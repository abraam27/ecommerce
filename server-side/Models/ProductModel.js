const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var ProductScema = new mongoose.Schema({
    productName:{
        type: String,
        minLength: 3,
        required: true, 
        trim: true 
    },
    description:{
        type: String,
        minLength: 20
    },
    numberOfItems: {
        type: Number,
        required: true,
        default: 1
    },
    price:{
        type: Number,
        required: true
    },
    deleted:{
        type: Boolean,
        default: false
    },
    createdBy: {
        type: ObjectId, // mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    image:{  
        type: String
    }
})
var Product = mongoose.model("Products", ProductScema);
module.exports = Product;
