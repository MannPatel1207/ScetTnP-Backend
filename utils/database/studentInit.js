const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Student = require("../../schema/model/studentSchema.js");



const dotEnv = require("dotenv");

dotEnv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT

//Starting Server
app.listen(port , ()=>{
    console.log(`server is listing on port ${port}`);
}
);
//connecting database
async function main(){
    await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});

//Intialize data
const data =`[
    {
        "_id": "64c3c3c31d1c1f29f2e80b97",
        "enrollment_no": "ET22BTCO096",
        "name": "Alex Johnson",
        "birth_date": "2002-04-15",
        "email": "alex.johnson@example.com",
        "contact_no": {
            "country_code": "+1",
            "number": "5551234567"
        },
        "gender": "Male",
        "cast": "General",
        "address": "123 Main Street, Anytown, USA",
        "result": {
            "ssc": {
                "percentage": 85,
                "passing_year": 2018
            },
            "hsc": {
                "percentage": 88,
                "passing_year": 2020
            },
            "diploma": {
                "percentage": 90,
                "semwise_result": [88, 92, 91, 89],
                "backlog": [0],
                "passing_year": 2023
            },
            "degree": {
                "percentage": 87,
                "semwise_result": [85, 89, 88, 87],
                "backlog": [0],
                "passing_year": 2026
            }
        },
        "applied": ["64c3c32f1d1c1f29f2e80b94", "64c3c3541d1c1f29f2e80b95"],
        "selected": {"offer":"64c3c32f1d1c1f29f2e80b94","salary":100000}
    },
    {
        "_id": "64c3c3e91d1c1f29f2e80b98",
        "enrollment_no": "ET22BTCO097",
        "name": "Emily Smith",
        "birth_date": "2002-05-21",
        "email": "emily.smith@example.com",
        "contact_no": {
            "country_code": "+1",
            "number": "5557654321"
        },
        "gender": "Female",
        "cast": "OBC",
        "address": "456 Maple Street, Anytown, USA",
        "result": {
            "ssc": {
                "percentage": 87,
                "passing_year": 2018
            },
            "hsc": {
                "percentage": 90,
                "passing_year": 2020
            },
            "diploma": {
                "percentage": 92,
                "semwise_result": [90, 93, 91, 92],
                "backlog": [0],
                "passing_year": 2023
            },
            "degree": {
                "percentage": 89,
                "semwise_result": [87, 91, 90, 89],
                "backlog": [0],
                "passing_year": 2026
            }
        },
        "applied": ["64c3c3791d1c1f29f2e80b96"]
    }
]
`;

Student.deleteMany().then(console.log("Data deleted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
Student.insertMany(JSON.parse(data)).then(console.log("Data Inserted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
