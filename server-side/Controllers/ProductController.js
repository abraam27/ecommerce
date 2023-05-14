const Product = require("../Models/ProductModel");
const fs = require('fs');
const path = require('path');
const GetAllProducts = async (req, res)=>{
    try{
        let allProduct = await Product.find({deleted: false})
        if(allProduct.length !== 0){
            res.status(200).json(allProduct);
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.mesage})
    }
};
const GetAllProductsByUserID = async (req, res)=>{
    try{
        let allProduct = await Product.find({deleted: false , createdBy:req.params['userID']})
        if(allProduct.length !== 0){
            res.status(200).json(allProduct);
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.mesage})
    }
};
const GetProductByID = async (req, res)=>{
    try{
        let product = await Product.findOne({_id: req.params['productID'], deleted: false});
        if(product){
            res.status(200).json({product})
        }
        else{
            res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
};
const AddProduct = async(req, res)=>{
    const {productName, description, numberOfItems ,price} = req.body;
    const newProduct= new Product({productName,description, numberOfItems ,price, createdBy:req.params['userID'], image:req.file.filename})
    newProduct.save()
    .then((data)=>{
        res.status(201).json({message: 'Add Product Success', data})
    })
    .catch((err)=>{
        res.status(400).json({message: 'Catch Erro : ' + err.message})
    })
};
const UpdateProduct = async (req, res)=>{
    try{
        let product = await Product.findOneAndUpdate({_id: req.params['productID']}, {...req.body}, {new:true});
        if(product){
            res.status(200).json({product})
        }
        else{
            res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
        } 
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
};
const DeleteProduct = async (req, res)=>{
    try{
        let productDeleted = await Product.findByIdAndUpdate(req.params['productID'], {deleted: true}, {new: true});
        if(productDeleted){
            res.status(200).json({message: 'This Product Is Deleted Successfuly.'});
        }else{
            res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
};
//updateImage
const UpdateProductImage = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(406).json({ message: "in-valid file format" });
        } else {
            const product = await Product.findById(req.params['productID']);
            if (!product) {
                res.status(404).json({ message: 'in-valid Product' })
            } else {
                if (product.image) {
                    const fullPath = '../images/ProductImages/' + product.image;
                    fs.unlinkSync(path.join(__dirname, fullPath))
                }
                const updatedProduct = await Product.findByIdAndUpdate(req.params['productID'], { iamge: req.file.filename }, { new: true });
                res.status(201).json({ message: "updated Product Image ", updatedProduct })
            }
        }
    } catch (error) {
        res.status(400).json({ message: 'Catch Error : ' + error.message })
    }
};
module.exports = {
    GetAllProducts,
    GetAllProductsByUserID,
    GetProductByID,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateProductImage
};