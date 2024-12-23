const {Gtu_student} = require('./schema/model/studentSchema.js');
const Company = require('./schema/model/companySchema.js');
const Offer = require('./schema/model/offerSchema.js');
const mongoose = require('mongoose')

let getData =async ()=> {
    let data = { 19 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0} ,18 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0} , 17 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0}}

    let students = [];
    let offers = await Company.find({});
    for (let offer of offers){
    console.log(offer.name)}
}
async function main(){
    await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
    let students = getData();
    

}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});