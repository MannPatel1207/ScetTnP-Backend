const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const object = require("../utils/functions/Object.js");
const notificationFun = require("../controllers/notification.js")
const {storage,imageUpload} = require("../utils/cloudinary.js")



//Index Route
router.get("/",wrapAsync(notificationFun.indexRoute));

//new Route
router.post("/",imageUpload('attachments'),wrapAsync(notificationFun.newRoute));

//show Route
router.get("/:id",wrapAsync(notificationFun.showRoute));

//update Route
router.patch("/:id",wrapAsync(notificationFun.updateRoute));

//delete route
router.delete("/:id",wrapAsync(notificationFun.deleteRoute));

module.exports = router