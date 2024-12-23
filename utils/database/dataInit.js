const mongoose = require("mongoose");
const Company = require("../../schema/model/companySchema.js");
const xlsx = require("xlsx");
const Offer = require("../../schema/model/offerSchema.js");
const {Gtu_student} = require("../../schema/model/studentSchema.js");

// Connecting to the database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        console.log("Database connected");
        
        let dataSet = await getData();
        await Company.deleteMany();
        await Gtu_student.deleteMany();
        await Offer.deleteMany();


        console.log("Existing data deleted successfully");

        await addData(dataSet);
    } catch (err) {
        console.log(`Error in connecting database: ${err}`);
    }
}

main();

async function getData() {
    const workbook = xlsx.readFile("I:/BatchWise.xlsx");
    let data = [];
    for(let i = 4; i < workbook.SheetNames.length; i++){
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        const dataSet = xlsx.utils.sheet_to_json(sheet);
        data.push(...dataSet);
    }

    return data;
}

async function addData(dataSet) {
    let c = 1;
    let remaining = [];
    for (let data of dataSet) {
        try {
            let company = await Company.findOne({ name: data['Name of Company'] });

            if (!company) {
                console.log('New Company');
                await addCompany(data);
                company = await Company.findOne({ name: data['Name of Company'] });
            }

            let newOffer = new Offer({
                role: data['Name of Company'],
                drive: data['Campus Drive'],
                type: data['JOB/\nInternship/\nTraining/\nApprenticeship'],
                sector: data['Sector'],
                salary: { min: 0, max: data[440000] },
                company: company._id,
                batch: data['Student Selected from Academic Year/ batch']
            });

            let offer = await newOffer.save();

            // Updating company
            if (company.offers) {
                company.offers.push(offer._id);
            } else {
                company.offers = [offer._id];
            }
            await Company.findByIdAndUpdate(company._id, { $set: { offers: company.offers } });

            // Updating student
            let student = await Gtu_student.findOne({ enrollment_no: data['Enrolment No'] });

            if (!student) {
                await addStudent(data);
                student = await Gtu_student.findOne({ enrollment_no: data['Enrolment No'] });
            }

            if (student) {
                if (student.applied) {
                    student.applied.push(offer._id);
                } else {
                    student.applied = [offer._id];
                }
                student.selected = data['Salary Offered( P.A.)'] === 0 || !data['Salary Offered( P.A.)']
                    ? student.selected
                    : { offer: offer._id, salary: data['Salary Offered( P.A.)'] };

                await Gtu_student.findByIdAndUpdate(student._id, { $set: { applied: student.applied, selected: student.selected } });
            }

            // Updating offer with applicants and selected students
            if (offer.applicants) {
                offer.applicants.push(student._id);
            } else {
                offer.applicants = [student._id];
            }

            if (data['Salary Offered( P.A.)'] !== 0 && data['Salary Offered( P.A.)']) {
                offer.selected ? offer.selected.push(student._id) : offer.selected = [student._id];
            }

            await Offer.findByIdAndUpdate(offer._id, { $set: { applicants: offer.applicants, selected: offer.selected } });

            console.log(`Done ${c}`);
            c += 1;

        } catch (err) {
            remaining.push(data);
            console.log(`Error inserting data ${c}:`, err);
        }
    }
    console.log("Complete");
}

async function addCompany(data) {
    try {
        let newCompany = new Company({
            name: data['Name of Company']
        });

        await newCompany.save();
    } catch (err) {
        console.log(err);
    }
}

async function addStudent(data) {
    try {
        let newStudent = new Gtu_student({
            enrollment_no: data['Enrolment No'],
            name: data['Selected Student Name'],
            gender: data['Gender'],
            cast: data['Cast']
        });
        await newStudent.save();
    } catch (err) {
        console.log(err);
    }
}
