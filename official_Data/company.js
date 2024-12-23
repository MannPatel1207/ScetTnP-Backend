const mongoose = require("mongoose");
// const Student = require("../schema/model/student.js");
const Company = require("../schema/model/companySchema.js");
const xlsx = require("xlsx");

// connecting database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");

        let DataSet = await getData();
        await Company.deleteMany();
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
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const dataSet = xlsx.utils.sheet_to_json(sheet);

    return dataSet;
}

async function addData(dataSet) {
    let c = 1;
    for (let data of dataSet) {
        try {
            let newCompany = new Company({
                name: data.Name,
                link: data.link,
                desc: data.desc,
                contact_no: { country_code: '+91', number: data['mob no'] },
                address: data.add,
            });

            await newCompany.save();
            console.log(`Data ${c} inserted`);
            c += 1;
        } catch (err) {
            console.log(`Error inserting data ${c}:`, err);
        }
    }
}
