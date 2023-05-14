const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: 'Users',
        required: true
    },
    products:{
        type: [{
            productID: {
                type: ObjectId,
                ref: 'Products',
                required: true
            },
            unitPrice: Number,
            quantity: {
                type: Number,
                default: 1
            },
        }]
    },
    totalPrice: {
        type: Number,
        default: 1
    },
    phone: { 
        type: String, 
        pattern: "^01[0125][0-9]{8}$",
        required: true
    },
    orderAddress: {
        type: String, 
        required: true
    },
    paymentMethod: {
        type: String,
        default: 'Cash',
        enum: ['Cash', 'Visa']
    },
    orderDate: {
        type: String
    }
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;