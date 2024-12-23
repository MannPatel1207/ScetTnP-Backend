const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const companyFun = require("../controllers/compnay.js")
const {storage} = require("../utils/cloudinary.js")
const multer = require("multer");
const upload = multer({ storage })

// Index Route
router.get("/", wrapAsync(companyFun.indexRoute));

// New Route
router.post("/", upload.single('Logo'), wrapAsync(companyFun.newRoute));

// Show Route
router.get("/:id", wrapAsync(companyFun.showRoute));

// Update Route
router.patch("/:id", wrapAsync(companyFun.updateRoute));

// Delete Route
router.delete("/:id", wrapAsync(companyFun.deleteRoute));

module.exports = router;
