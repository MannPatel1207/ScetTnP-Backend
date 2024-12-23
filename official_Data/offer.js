const mongoose = require("mongoose");
const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const xlsx = require("xlsx");
const moment = require("moment");

// connecting database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        console.log("Database connected");

        let DataSet = await getData();
        // console.log(DataSet)
        await Offer.deleteMany();
        console.log("Existing data deleted successfully");

        await addData(DataSet);
    } catch (err) {
        console.log(`Error in connecting database: ${err}`);
    }
}

main();

async function getData() {
    // read file
    const workbook = xlsx.readFile("I:/ScetTnp.xlsx");
    // get first sheet
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];
    const dataSet = xlsx.utils.sheet_to_json(sheet);

    return dataSet;
}

async function addData(dataSet) {
    let c = 1;
    for (let data of dataSet) {
        try {
            let company = await Company.findOne({name : data.company_name});
            // console.log(data.criteria); 
            if(data.criteria){
                data.criteria = data.criteria.split("\r\n");
                criteria=data.criteria;
                data.criteria={};
                for(cri of criteria){
                    cri=cri.split(":");
                    data.criteria[cri[0]] = cri[1];
                }
            }

            // if(data.sector !== "IT" || data.sector !== "Managment" ){
            //     data.sector = "core"
            // }
            let no = Math.floor(Math.random() * 3);
            if(no === 0){
                data.sector = "core";
            }
            if(no === 1){
                data.sector = "IT";
            }
            if(no === 2){
                data.sector = "managment";
            }

            let formatDateString = (dateString) => {
                // Parse the date string using Moment.js
                let parsedDate = moment(dateString, 'DD-MM-YYYY');
                return parsedDate.isValid() ? parsedDate.toDate() : null;
            };

            data.last_date_for_apply = formatDateString(data.__EMPTY);
            data.interview_date = formatDateString(data.__EMPTY_1);
            if(company){
            let newOffer = new Offer({
                role : data.role,
                offer_link : data.apply_link,
                location : data.location.split(',') || [data.location],
                total_opening : data.total_opening,
                drive : data.drive,
                sector : data.sector,
                type : data.type,
                salary : {min : data.min_salary , max : data.max_salary },
                criteria : data.criteria,
                last_date : data.last_date_for_apply,
                interview_date : data.interview_date,
                contacted_person : {name : data.contancted_person_name ,designation : data.designation ,email : data.email ,contact_no : {country_code : '+91' , number : data.number}},
                company : company._id
            });

            await newOffer.save();
            console.log(`Data ${c} inserted`);
            c += 1;
        }
            

        } catch (err) {
            console.log(`Error inserting data ${c}:`, err);
        
        
    }
    }
}
