const mongoose = require("mongoose");
const Notification = require("../../schema/model/notificationSchema.js");


// connecting database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        console.log("Database connected");

        await Notification.deleteMany({});
        console.log("done")
    } catch (err) {
        console.log(`Error in connecting database: ${err}`);
    }
}

main();
