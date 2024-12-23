const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Company = require("../../schema/model/companySchema.js");


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
      "_id": "64c3c28d1d1c1f29f2e80b91",
      "name": "Tech Solutions Inc.",
      "link": "http://techsolutions.com",
      "desc": "Leading provider of tech solutions.",
      "contact_no": {
          "country_code": "+1",
          "number": "1234567890"
      },
      "address": "123 Tech Street, Silicon Valley, CA",
      "extra_attribute": {},
      "offers": []
  },
  {
      "_id": "64c3c2c71d1c1f29f2e80b92",
      "name": "Innovative Creations",
      "link": "http://innovativecreations.com",
      "desc": "Creative design and development agency.",
      "contact_no": {
          "country_code": "+44",
          "number": "2345678901"
      },
      "address": "456 Creative Lane, London, UK",
      "extra_attribute": {},
      "offers": []
  },
  {
      "_id": "64c3c2f01d1c1f29f2e80b93",
      "name": "Data Analytics Co.",
      "link": "http://dataanalytics.com",
      "desc": "Data-driven analytics services.",
      "contact_no": {
          "country_code": "+91",
          "number": "9876543210"
      },
      "address": "789 Data Avenue, Bangalore, India",
      "extra_attribute": {},
      "offers": []
  }
]`;
Company.deleteMany().then(console.log("Data deleted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
Company.insertMany(JSON.parse(data)).then(console.log("Data Inserted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});