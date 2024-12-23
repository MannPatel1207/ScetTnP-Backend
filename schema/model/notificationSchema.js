const mongoose = require("mongoose");
const Offer = require("./offerSchema.js");

// Define the company schema
const notificationSchema = new mongoose.Schema({
    // sender : {
    //     type : String
    // },
    message : { 
        type : String
    },
    attachments : [{
        type : {
            filename : String , 
            path : String
        }
    }]
});

// Create the Company model
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
