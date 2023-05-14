const express = require('express');
const connectToDB = require('./DB_Connection');

const bodyparser = require("body-parser");

const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

// Connection to Database
connectToDB()

// middelWare to read & set Cookie & API with front-end
app.use(cors({ origin: true, credentials: true }));

// For Unexcepted Error
// Handel UncaughtException Exception 
process.on("uncaughtException", (exception)=>{
    console.log(exception)
    console.log("Error From uncaughtException");
    // process.exit(1);
})
// Handel UnhandledRejection Exception 
process.on("unhandledRejection", (exception)=>{
    console.log(exception)
    console.log("Promise Rejection");

    // process.exit(1);
})

// middelWare to Understand response
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));
// parse application/json
app.use(bodyparser.json());
app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



//#region For products 
const productRoutes = require("./Routes/ProductRoutes");
app.use("/api/products",productRoutes);
//#endregion

//#region For Orders 
const OrderRoutes = require("./Routes/OrderRoutes");
app.use("/api/orders",OrderRoutes);
//#endregion

//#region For Auth
const authRoutes = require("./Routes/AuthRoutes");
app.use("/api/auth",authRoutes);
//#endregion

//#region For User 
const userRoutes = require("./Routes/UserRoutes");
app.use("/api/users",userRoutes);
//#endregion

// payment region
const paymentRoutes = require("./Routes/PaymentRoutes");
app.use("/api/payment", paymentRoutes);
// payment end

//#region For images
app.use('/api/images' , express.static(path.join(__dirname ,'./images' )));
//#endregion


const PORT = process.env.PORT || 7500;

app.listen(PORT, ()=>{console.log('http://localhost:' + PORT )});