const Student = require("../schema/model/studentSchema.js");
const Offer = require("../schema/model/offerSchema.js");
const object = require("../utils/functions/Object.js");

const indexRoute = async (req,res)=>{

    //finding all offers from database
    let student = await Student.find().populate('applied').populate('selected');

    //sending json object of all offers array
    res.status(200).json({student});
    
}

const newRoute = async (req,res)=> {

}

const showRoute= async (req,res,next)=>{

    //retriving offer is from url
    let {enrollNo} = req.params

    //finding offer in DB
    let student = await Student.find({enrollment_no : enrollNo}).populate('applied').populate('selected');

    //chacking valid id
    if(student){
        res.status(200).json(student[0]);
    }

    //sending offer
    
    res.status(400).json({message : "student not available"});
}

const updateRoute = async (req,res)=>{

}

const deleteRoute = async (req,res)=>{
}

module.exports = {indexRoute , newRoute , showRoute , updateRoute , deleteRoute}