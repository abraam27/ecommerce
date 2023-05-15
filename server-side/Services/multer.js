const multer = require('multer');
const fs = require('fs')
const path = require('path')

const multerPath = {
    ProductImages:'images/ProductImages' ,
    UserImages:'images/UserImages' ,
    fieldOwnerProfilePic:'images/fieldOwnerPic' ,
    fieldPic:'images/fieldPic' ,
}

const multerValidators = {
    image:['image/jpg' , 'image/jpeg' , 'image/png', 'image/jfif'] 
}

const HMR = (err , req , res , next)=>{
    if(err){
        res.status(400).json({mesage:"Multer Error" , err});
    }else {
        next()
    }
}

function myMulter(customPath , customValidator) {
    
    if (!customPath || customPath == null) {
        customPath = 'general'
    }
    const fullPath = path.join(__dirname , `../${customPath}`);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath , {recursive:true})
    }

    const storage = multer.diskStorage({

        destination: function (req , file , cb) {
            req.finalDestination = `/${customPath}`
            cb( null , fullPath);
        },
        filename: function( req , file , cb){
            cb(null , Date.now()+ "_" + file.originalname )
        }
    })
    
    const fileFilter = function (req , file , cb){

        if(customValidator.includes(file.mimetype)){
            cb(null , true)
        }else{
         req.fileErr = true
         cb(null , false)
        }
    }

   const upload = multer({dest:fullPath  , fileFilter , storage })
   return upload
}

module.exports = {
    myMulter ,
    multerPath ,
    multerValidators , 
    HMR
}