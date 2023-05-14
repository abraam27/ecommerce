const GameValidate = require("../Utils/GameValidation");
const GameServices = require("../Services/GameServices");
const FieldServices = require("../Services/FieldServices");
var GetAllGames = async (req, res)=>{
    res.status(200).json(await GameServices.GetAllGames());
};
var GetGameByID = async (req, res)=>{
    res.status(200).json(await GameServices.GetGameByID(req.params.gameID));
};

var AddNewGame = async (req, res)=>{
    var newGame = new GameServices(req.body.userId,req.body.userFullName,req.body.fieldId,req.body.fieldName,req.body.date,req.body.hour,req.body.price,"","","");
    if(GameValidate(newGame)){
        if(await newGame.AddGame()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(GameValidate.errors);
    }
};
var UpdateGame = async (req, res)=>{
    var game = await GameServices.GetGameByID(req.params.gameID);
    if(await GameServices.UpdateGame(req.params.gameID, req.body)){
        if(await GameServices.UpdateFieldRate(game.fieldId)){
            res.status(201).send("Updated Successfully !");
        }
    }else{
        res.status(400).send("Not Updated !");
    }
};
var DeleteGame = async (req, res)=>{
    var game = await GameServices.GetGameByID(req.params.gameID);
    if(await GameServices.DeleteGame(req.params.gameID)){
        if(await GameServices.UpdateFieldRate(game.fieldId)){
            res.status(201).send("Deleted Successfully !");
        }
    }else{
        res.status(400).send("Not Deleted !");
    }
};
var GetAllGamesByFieldID = async (req, res)=>{
    res.status(200).json(await GameServices.GetAllGamesByFieldID(req.params.fieldID));
};
var GetAllNextGamesByFieldID = async (req, res)=>{
    let games = await GameServices.GetAllNextGamesByFieldID(req.params.fieldID)
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
var GetAllGamesByUserID = async (req, res)=>{
    let games = await GameServices.GetAllGamesByUserID(req.params.userID)
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
var GetAllNextGamesByUserID = async (req, res)=>{
    let games = await GameServices.GetAllNextGamesByUserID(req.params.userID);
    for(var i=0 ; i<games.length ; i++){
        var field = await FieldServices.GetFieldByID(games[i].fieldId);
        console.log(field)
        games[i] = {...games[i]._doc, fieldImages : field.images}
    }
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
var GetAllPreviousGamesByUserID = async (req, res)=>{
    let games = await GameServices.GetAllPreviousGamesByUserID(req.params.userID);
    for(var i=0 ; i<games.length ; i++){
        var field = await FieldServices.GetFieldByID(games[i].fieldId);
        console.log(field)
        games[i] = {...games[i]._doc, fieldImages : field.images}
    }
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
module.exports = {
    GetAllGames,
    GetGameByID,
    AddNewGame,
    UpdateGame,
    DeleteGame,
    GetAllGamesByFieldID,
    GetAllNextGamesByFieldID,
    GetAllGamesByUserID,
    GetAllNextGamesByUserID,
    GetAllPreviousGamesByUserID
};