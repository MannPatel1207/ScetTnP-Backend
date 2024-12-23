const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Offer = require("../../modules/offerSchema.js");

//Starting Server
app.listen(port , ()=>{
    console.log(`server is listing on port ${port}`);
}
);

const dotEnv = require("dotenv");

dotEnv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT
//connecting database
async function main(){
    await mongoose.connect(DB_URL);
}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});
//Intialize data
const data =`[
    {
        "_id": "64c3c32f1d1c1f29f2e80b94",
        "role": "Software Developer",
        "offer_link": "http://techsolutions.com/jobs/software-developer",
        "location": ["Silicon Valley, CA"],
        "total_opening": 5,
        "drive": "on camp",
        "type": "Job",
        "sector": "IT",
        "salary": {
            "min": 60000,
            "max": 80000
        },
        "criteria": {},
        "last_date": "2024-08-30",
        "interview_date": "2024-09-10",
        "contacted_person": {
            "name": "John Doe",
            "designation": "HR Manager",
            "email": "john@techsolutions.com",
            "contact_no": {
                "country_code": "+1",
                "number": "1234567890"
            }
        },
        "company": "64c3c28d1d1c1f29f2e80b91",
        "applicants": [],
        "selected": []
    },
    {
        "_id": "64c3c3541d1c1f29f2e80b95",
        "role": "Graphic Designer",
        "offer_link": "http://innovativecreations.com/jobs/graphic-designer",
        "location": ["London, UK"],
        "total_opening": 3,
        "drive": "off camp",
        "type": "Internship",
        "sector": "Design",
        "salary": {
            "min": 20000,
            "max": 30000
        },
        "criteria": {},
        "last_date": "2024-08-25",
        "interview_date": "2024-09-05",
        "contacted_person": {
            "name": "Jane Smith",
            "designation": "Creative Director",
            "email": "jane@innovativecreations.com",
            "contact_no": {
                "country_code": "+44",
                "number": "2345678901"
            }
        },
        "company": "64c3c2c71d1c1f29f2e80b92",
        "applicants": [],
        "selected": []
    },
    {
        "_id": "64c3c3791d1c1f29f2e80b96",
        "role": "Data Analyst",
        "offer_link": "http://dataanalytics.com/jobs/data-analyst",
        "location": ["Bangalore, India"],
        "total_opening": 4,
        "drive": "on camp",
        "type": "Job",
        "sector": "Analytics",
        "salary": {
            "min": 50000,
            "max": 70000
        },
        "criteria": {},
        "last_date": "2024-08-28",
        "interview_date": "2024-09-08",
        "contacted_person": {
            "name": "Raj Patel",
            "designation": "Operations Manager",
            "email": "raj@dataanalytics.com",
            "contact_no": {
                "country_code": "+91",
                "number": "9876543210"
            }
        },
        "company": "64c3c2f01d1c1f29f2e80b93",
        "applicants": [],
        "selected": []
    }
]`;
Offer.deleteMany().then(console.log("Data deleted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
Offer.insertMany(JSON.parse(data)).then(console.log("Data Inserted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});