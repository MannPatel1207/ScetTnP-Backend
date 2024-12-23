const mongoose = require("mongoose");
const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const {Su_student} = require("../schema/model/studentSchema.js");
const xlsx = require("xlsx");
const moment = require("moment");

// connecting database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP",
        );
        console.log("Database connected");

        let DataSet = await getData();
        await Su_student.deleteMany();
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
    const sheetName = workbook.SheetNames[2];
    const sheet = workbook.Sheets[sheetName];
    const dataSet = xlsx.utils.sheet_to_json(sheet);

    return dataSet;
}

async function addData(dataSet) {
    let c = 1;

    let formatDateString = (dateString) => {
        // Parse the date string using Moment.js
        let parsedDate = moment(dateString, 'DD-MM-YYYY');
        return parsedDate.isValid() ? parsedDate.toDate() : null;
    };


    let toNumber = (value) => {
        let number = Number(value);
        return isNaN(number) ? null : number;
    };

    for (let data of dataSet) {
        data.birth_date = formatDateString(data.__EMPTY_2);
        // console.log(data.birth_date);
        let newStudent = new Su_student({
            enrollment_no: data.__EMPTY,
            name: data.__EMPTY_1,
            birth_date: data.birth_date,
            email: data.__EMPTY_3,
            contact_no: { country_code: "+91", number: data.__EMPTY_5 },
            gender: data.__EMPTY_6,
            cast: data.__EMPTY_7,
            address: data.__EMPTY_8,
            result: {
                ssc: {
                    percentage: toNumber(data.__EMPTY_9),
                    passing_year: toNumber(data.__EMPTY_10)
                },
                hsc: {
                    percentage: toNumber(data.__EMPTY_11),
                    passing_year: toNumber(data.__EMPTY_12)
                },
                diploma: {
                    percentage: toNumber(data.__EMPTY_19),
                    semwise_result: [
                        toNumber(data.__EMPTY_13),
                        toNumber(data.__EMPTY_14),
                        toNumber(data.__EMPTY_15),
                        toNumber(data.__EMPTY_16),
                        toNumber(data.__EMPTY_17),
                        toNumber(data.__EMPTY_18)
                    ],
                    backlog: toNumber(data.__EMPTY_20),
                    passing_year: toNumber(data.__EMPTY_21)
                },
                degree: {
                    percentage: toNumber(data.__EMPTY_30),
                    semwise_result: [
                        toNumber(data.__EMPTY_22),
                        toNumber(data.__EMPTY_23),
                        toNumber(data.__EMPTY_24),
                        toNumber(data.__EMPTY_25),
                        toNumber(data.__EMPTY_26),
                        toNumber(data.__EMPTY_27),
                        toNumber(data.__EMPTY_28),
                        toNumber(data.__EMPTY_29)
                    ],
                    backlog: toNumber(data.__EMPTY_31),
                    passing_year: toNumber(data.__EMPTY_32)
                }
            }
        });

        try {
            await newStudent.save();
            console.log(`student ${c} is saved`);
        } catch (err) {
            console.log(`Error inserting student ${c}:`, err);
        }
        c += 1;
    }
}
