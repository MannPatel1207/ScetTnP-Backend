const mongoose = require("mongoose");
const Offer = require("./offerSchema.js");

// Define the company schema
const companySchema = new mongoose.Schema({
    name: {
        type: String
    },
    logo: {
        link: String,
        file_name: String
    },
    link: {
        type: String
    },
    desc: {
        type: String
    },
    contact_no: {
        country_code: String,
        number: String
    },
    batch: [{
        type:Number
        }
    ],
    address: {
        type: String,
    },
    extra_attribute: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    offers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Offer'
    }]
});

// Create the Company model
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
