const Notificaton = require("../schema/model/notificationSchema.js");
const sendMessage = require("./sendMessage.js")

const indexRoute = async (req, res) => {
    let notification = await Notificaton.find({});
    res.status(200).json({ notification });
};

const newRoute = async (req, res) => {
 
    let notificationData = req.body;
    const notification = new Notificaton({
        // sender : notificationData.sender,
        message : notificationData.message,
        attachments : req.files
    });
    // console.log(`req.files : ${req.files}`);
    await notification.save();
    await sendMessage({
        // sender : notificationData.sender,
        message : notificationData.message,
        attachments : req.files
    });
    res.status(201).json({ message: "New Notification saved" });
};

const showRoute = async (req, res, next) => {
    let { id } = req.params;
    let notification = await Notificaton.findOne({ _id : id});
    if (!notification) {
        let err = new Error("Notification not found. ");
        err.status(400);
        throw err;
    }
    res.status(200).json(notification);
};

const updateRoute = async (req, res) => {
    let { id } = req.params;
    let updateData = req.body;

    let notification = await Notificaton.findOne({ _id : id});
    if (!notification) {
        let err = new Error("Notification not found. ");
        err.status(400);
        throw err;
    }

    // Make sure to only update fields provided
    let updatedCompany = await Company.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.status(200).json({ message: "Company updated successfully", updatedCompany });
};

const deleteRoute = async (req, res) => {
};

module.exports = {indexRoute , newRoute, showRoute ,updateRoute , deleteRoute}