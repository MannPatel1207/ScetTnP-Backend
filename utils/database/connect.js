const mongoose = require("mongoose");
const {Su_student} = require("../../schema/model/studentSchema.js");
const Offer = require("../../schema/model/offerSchema.js");

async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        console.log("Database connected");

        let offerId = await getOfferData();
        await assignOffer(offerId);
        console.log("Done");
    } catch (err) {
        console.log(`Error in connecting database: ${err}`);
    }
}

main();

async function getOfferData() { 
    let allData = await Offer.find({});
    return allData.map(data => data._id);
}

async function assignOffer(offerId) {
    let count = 0;
    let students = await Su_student.find({});
    
    for (let student of students) {
        if (!student.applied) {
            student.applied = [];
        }
        if (!student.placed) {
            student.placed = [];
        }

        let no = Math.floor(Math.random() * 35);
        if (no < 25) { 
            let size = no % 3;
            let c = 0;

            while (c <= size) {
                let num = Math.floor(Math.random() * 35);
                let offer = await Offer.findById(offerId[num]);

                if (!offer) continue;

                if (!offer.applicants) {
                    offer.applicants = [];
                }
                if (!offer.selected) {
                    offer.selected = [];
                }

                if (!offer.applicants.includes(student._id)) {
                    offer.applicants.push(student._id);
                }

                if (!student.applied.includes(offerId[num])) {
                    student.applied.push(offerId[num]);
                }

                await Offer.findByIdAndUpdate(offer._id, { $set: { applicants: offer.applicants } });

                if (no % 5 === 0 && !offer.selected.includes(student._id)) {
                    offer.selected.push(student._id);
                    student.selected = { offer: offerId[num], salary: offer.salary.max };
                    await Offer.findByIdAndUpdate(offer._id, { $set: { selected: offer.selected } });
                }

                c++;
            }
        }
        await Su_student.findByIdAndUpdate(student._id, { $set: { applied: student.applied, selected: student.selected } });
        console.log(`Student ${count} updated`);
        count += 1;
    }
}
