const {Gtu_student} = require('./schema/model/studentSchema.js');
const Company = require('./schema/model/companySchema.js');
const Offer = require('./schema/model/offerSchema.js');
const mongoose = require('mongoose')

let getData =async ()=> {
    let students = [];
    let company = ['Tata Consultancy Services',
        'Tata Consultancy Services Ltd.',
        'TCS - Code Vita',
        'TCS - Inframind',
        'TCS- National',
        'Tata Consultancy Services Ltd',
        'TCS']
    let offers = await Company.find({name : { $in: company }});
    // let offers = await Company.find({_id : '66c326e136c2bb023d2679e3'});

    for (let offer of offers){
    console.log(offer._id)}
}
async function main(){
    await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
    let students = getData();
    

}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});