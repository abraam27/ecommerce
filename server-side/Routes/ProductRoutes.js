const express = require("express");
const router = express.Router();
const Multer= require("../Services/multer")
const multerPath = Multer.multerPath;
const multerValidators= Multer.multerValidators;
const HMR= Multer.HMR;
const myMulter= Multer.myMulter;

const ProductController = require("../Controllers/ProductController");
// get all Products
router.get("/",ProductController.GetAllProducts)
// get all Products by seller id
router.get("/my/:userID",ProductController.GetAllProductsByUserID)
// get Product by id
router.get("/:productID",ProductController.GetProductByID);
// add new Product
router.post("/add/:userID",myMulter(multerPath.productImages, multerValidators.image).single('image'),HMR,ProductController.AddProduct);
// update Product by id
router.patch("/update/:productID",ProductController.UpdateProduct);
// delete Product by id
router.delete("/delete/:productID",ProductController.DeleteProduct);
// update Product image
router.post("/updateProductImage/:productID",myMulter(multerPath.productImages , multerValidators.image).single('image'),HMR,ProductController.UpdateProductImage);

module.exports = router;