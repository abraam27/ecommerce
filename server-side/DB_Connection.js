const mongoose = require("mongoose");
// const DB_URL = process.env.MONGO_DB_CONNECTION;
const DB_URL = "mongodb://127.0.0.1:27017/eCommerce";
const connection = ()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(DB_URL, {useNewUrlParser:true});
    var connect = mongoose.connection;
    connect.on('connected', function() {
        console.log('database is connected successfully!');
    });
    connect.on('disconnected',function(){
        console.log('database is disconnected successfully!');
    })
    connect.on('error', console.error.bind(console, 'connection error:'));

}
module.exports = connection;