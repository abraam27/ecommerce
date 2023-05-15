const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

// get all users
router.get("/",UserController.GetAllUsers);
// get user by ID
router.get("/:userID",UserController.GetUserByID);
// Update user
router.patch("/update/:userID",UserController.UpdateUser);
// update User Password
router.patch("/resetPassword/:userID",UserController.UpdatePassword);
// delete user
router.delete("/delete/:userID",UserController.DeleteUser);
module.exports = router