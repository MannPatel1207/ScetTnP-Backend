const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const userFun = require("../controllers/user.js")

//Index Route
router.get("/",wrapAsync(userFun.indexRoute));

//new Route
router.post("/",wrapAsync(userFun.newRoute));

// //temp forms
// router.get("/new",wrapAsync(async (req,res,next)=>{
//     res.render("offers/new.ejs");
// }));

//show Route
router.get("/:enrollNo",wrapAsync(userFun.showRoute));

//update Route
router.patch("/:id",wrapAsync(userFun.updateRoute));


// //temp form
// router.get("/:id/update",wrapAsync(async (req,res,next)=>{

//     //retriving id from url
//     let {id} = req.params

//     //fanding offer in DB
//     let  offer = await Offer.findById(id);

//     //cheak for valid id
//     if(Object.keys(offer).length === 0){
//         throw new Error("Invalid Id");
//     }

//     res.render("offers/update.ejs",offer);
// }));

//delete route
router.delete("/:id",wrapAsync(userFun.deleteRoute));

module.exports = router