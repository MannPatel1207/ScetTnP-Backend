const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Offer = require("./offerSchema.js");


const studentSchema = mongoose.Schema({
    enrollment_no : {
        type : String
    },
    name : {
        type : String
    },
    birth_date: {
        type : Date
    },
    email : {
        type : String
    },
    contact_no:{
        type : {
            country_code : String,
            number : String
        },
    },
    gender:{
        type : String
    },
    cast : {
        type : String
    },
    address : {
        type : String
    },
    result :{
        type : {
            ssc : {
                type : {
                    percentage : Number,
                    passing_year : Number
                },
            },
            hsc : {
                type : {
                    percentage : Number,
                    passing_year : Number
                },
            },
            diploma : {
                type : {
                    percentage : Number,
                    semwise_result : [Number],
                    backlog : Number,
                    passing_year : Number
                    
                },
            },
            degree : {
                type : {
                    percentage : Number,
                    semwise_result : [Number],
                    backlog : Number,
                    passing_year : Number
                    
                },
            },
        }
    },
    applied : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Offer'
    }],
    selected : {
        type : {
            offer:{
                type:mongoose.Schema.ObjectId,
                ref : 'Offer'
            },
            salary : {
                type : Number,
            }
        }
    }

});

const Su_student = mongoose.model("Su_student",studentSchema);
const Gtu_student = mongoose.model("Gtu_student",studentSchema);
module.exports = {Su_student,Gtu_student};