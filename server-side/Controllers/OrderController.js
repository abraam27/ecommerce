const Order = require("../Models/OrderModel");
const Product = require("../Models/ProductModel");
const moment = require("moment/moment");


const SilodItemProduct = async(products)=>{
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById({_id:products[i].productID});
    if(product){
        let productQun = product.numberOfItems - products[i].quantity;
        await Product.findByIdAndUpdate({_id:product._id},{numberOfItems: productQun},{new:true});
    }
  }
}
const ReturnSilodItemProduct = async(products)=>{
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById({_id:products[i].productID});
    if(product){
        let productQun = product.numberOfItems + products[i].quantity;
        await Product.findByIdAndUpdate({_id:product._id},{numberOfItems: productQun},{new:true});
    }
  }
}
const CreateOrder = async(req,res)=>{
    try {
      const {products , phone , orderAddress , paymentMethod } = req.body ;
      let totalPrice = 0 ;
      let sumTotal = 0;
      const finalList = []

      for (let i = 0; i < products.length; i++) {
          // new Update
          let pro = await Product.findById(products[i].productID).select('-_id price');
          // Updated 
          sumTotal = (products[i].quantity || 1 ) * pro.price;
          totalPrice += sumTotal ;
          finalList.push(products[i]);
      }
      const newOrder = new Order({products:finalList , phone , orderAddress , paymentMethod ,userID:req.params['userID']  , totalPrice , date:moment().format()});
      const savedOrder = await newOrder.save();
      if (!savedOrder) {
          res.status(503).json({message:"Sorry , Please try to re-order agian"});
      }else{
          await SilodItemProduct(savedOrder.products);
          res.status(201).json({message:"Done" , savedOrder, totalPrice });
      }
    } catch (error) {
          res.status(500).json({message:"Catch Error : " + error.message})
    }
};

const CancelOrder = async(req,res)=>{
  try {
   const orderFound = await Order.findOneAndDelete({_id:req.params['orderID'] },{new:true});
   if (!orderFound) {
    res.status(404).json({ message: "in-valid Order id" })
   }else{
      await ReturnSilodItemProduct(orderFound.products);
      res.status(200).json({ message: "Delete Done"})
   }
  } catch (error) {
    res.status(500).json({message:"Catch Error : " + error.message})
  }
};

module.exports = {
    CreateOrder ,
    CancelOrder
}
