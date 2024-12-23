const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const object = require("../utils/functions/Object.js");
const Student = require("../schema/model/studentSchema.js");

const indexRoute = async (req,res)=>{

    //finding all offers from database
    let offers = await Offer.find({}).populate('company');

    //sending json object of all offers array
    res.status(200).json({offers});
    
};

const newRoute = async (req,res)=> { 

    //retriving data from request body
    let offer = req.body;

    //adding formate to criteria
    offer.criteria = offer.criteria.split("\r\n");
    criteria=offer.criteria;
    offer.criteria={};
    for(cri of criteria){
        cri=cri.split(":");
        offer.criteria[cri[0]] = cri[1];
    }
   

    //getting companies id
    let company = await Company.findOne({name : offer.companyName});

    //If company not present 
    if(!company){
        let err = new Error("company not exsist !! please register company first .")
        err.status = 400
        throw err;
    }
    
    //creating instance of Offer model
    const newOffer = new Offer({
        role : offer.title,
        type : offer.type,
        location : offer.location.split(","),
        salary: {min : offer.salary},
        criteria : offer.criteria,
        last_date : offer.last_date,
        company : company._id,
    });

    //adding offer to database
    const savedOffer = await newOffer.save();
    
    //updating offer fild in compnay collection
    company.offers.push(savedOffer._id);

    //update in Company collectin in database
    Company.findByIdAndUpdate(company._id,{$set :{offers : company.offers}});

    res.status(200).json({message : "new user saved"});
}

const showRoute = async (req,res,next)=>{

    //retriving offer is from url
    let {id} = req.params

    //finding offer in database
    let offer = await Offer.findById(id).populate('company');

    //If offer idis invalid
    if(!offer){
        let err = new Error("Offer not exsist")
        err.status = 400
        throw err;
    }

    //sending offer
    res.status(200).json(offer);
}

const updateRoute = async (req,res)=>{

    //retriving data from request body
    let offer = req.body;
    console.log(offer);
    // let {id,title,location,type,salary,last_date, ...criteria} = req.body -> for frontend

    //criteria : {criteria : {} }
    //simplifying obj -> criteria : {}
    offer.criteria = offer.criteria.criteria;

    // if criteria having a array of data , it is in string
    //retrive in form of array
    for (cri in offer.criteria){
        if(offer.criteria[cri].includes(",")){
            offer.criteria.criteria[cri] = offer.criteria.criteria[cri].split(",");
        }
    }

    //finding obj from DB
    let offers = await Offer.findById(id);

    //cheak for valid offer id
    if(!offers){
        let err = new Error("Offer not found...")
        err.status = 400
        throw err;
    }

    //update data
    let newOffer = await Offer.findByIdAndUpdate(id ,{$set :{title : title , location : location.split(","), type:type , salary : salary , last_date : last_date , criteria : criteria }},{ new : true}).then(console.log("data updated")).catch((err) =>{console.log("data not updated")});
    console.log(newOffer);
    //sending a completed signals
    res.status(200).json({message : "Data updated successfully "});
    
    
}

const deleteRoute = async (req,res)=>{
    //retriving id from query
    let {id} = req.params;

    //deleting offer
    let deletedOffer = await Offer.findByIdAndDelete(id);
    console.log(deletedOffer);

    //retriving company of deleted offer
    let compnayId = deletedOffer.company;
    let company = await Company.findById(compnayId);

    //removing deleted offer id from offer fild in company collection
    company.offers = company.offers.filter(offId => offId !== id );

    //updating in db
    await Company.findByIdAndUpdate(compnayId,{$set:{offers : company.offers}});

    //retriving applicants details form deleted offer
    let applicantsId = deletedOffer.applicants;

    //itrating over all applicants
    for(let applicantId in applicantsId){

        //retriving details of student form database
        let student = await Student.findById(applicantId);

        //removing deleted offer id from applied fild in student collection
        student.applied = student.applied.filter(offerId => offerId !== id);

        //updating student in data base
        await Student.findByIdAndUpdate(applicantId , {$set : {applied : student.applied}});
    }

    //retriving applicants details form deleted offer
    let selectedId = deletedOffer.selected;

    //itrating over all applicants
    for(let selectId in selectedId){

        //retriving details of student form database
        let student = await Student.findById(selectId);

        //removing deleted offer id from applied fild in student collection
        student.applied = student.applied.filter(offerId => offerId !== id);

        //updating student in data base
        await Student.findByIdAndUpdate(selectId , {$set : {applied : student.applied}});
    }



    res.status(200).json({message : "Offer deleted sucessfully"});
}

const applyRoute = async(req,res)=>{
    //retriving offer id from url
    let {id} = req.params;

    // retriving data of offer
    let offer = await Offer.findById(id);

    //If offer idis invalid
    if(!offer){
        let err = new Error("Offer not exsist")
        err.status = 400
        throw err;
    }

    //retriving student data from req body
    let student = req.body;

    //adding offer in applicants
    student.applied ? student.applied.push(id) : student.applied = [id];

    //updating student in database
    await Student.findByIdAndUpdate(student._id , {$set : {applied : student.applied}});
    
    //adding applicant in offer
    offer.applicants ? offer.applicants.push(student._id) : offer.applicants = [student._id];

    //updating offer in database
    await Offer.findByIdAndUpdate(id , {$set : {applicants : offer.applicants}})


}

module.exports = {indexRoute , newRoute , showRoute , updateRoute , deleteRoute , applyRoute}