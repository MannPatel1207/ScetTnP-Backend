const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const {Gtu_student} = require("./studentSchema.js");
const Company = require("./companySchema.js");



const offerSchema = mongoose.Schema({
    role : {
        type : String
    },
    offer_link : {
        type : String
    },
    location : [{
        type : String
    }],
    total_opening : {
        type : Number,
    },
    drive :{//on camp , off camp
        type : String,
    },
    type : { //Job & Internship
            type : String
    },
    sector : {
        type : String
    },
    salary : {
        type : {
            min : Number,
            max : Number
        }
    },
    criteria : {
        type : Object
    },
    last_date : {
        type : Date
    },
    interview_date : {
        type : Date
    },
    contacted_person : {
        type : {
            name : String,
            designation : String,
            email : String,
            contact_no : {
                type : {
                    country_code : String,
                    number : String
                },
            }
        }
    },
    company : {
        type : mongoose.Schema.ObjectId,
        ref : 'Company'
    },
    applicants : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Gtu_student'
    }],
    selected : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Gtu_student'
    }]
});

const Offer = mongoose.model("Offer",offerSchema);
module.exports = Offer;

//last date
//name
//criteria : graduation year , breanch
//opening
//ctc