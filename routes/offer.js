const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const object = require("../utils/functions/Object.js");
const offerFun = require("../controllers/offer.js");
const validateOfferSchema = require('../schema/joi/offerValidationSchema.js')

//Index Route
router.get("/",wrapAsync(offerFun.indexRoute));

//new Route
router.post("/",validateOfferSchema,wrapAsync(offerFun.newRoute));

//apply route
router.patch('/:id/apply',wrapAsync(offerFun.newRoute));

//show Route
router.get("/:id",wrapAsync(offerFun.showRoute));

//update Route
router.patch("/:id",validateOfferSchema,wrapAsync(offerFun.updateRoute));

//delete route
router.delete("/:id",wrapAsync(offerFun.deleteRoute));



module.exports = router