const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();
const mailId = process.env.EMAIL_ID;
const password = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: mailId,
        pass: password,
    },
});

async function sendMessage(notificationData) {
        // Initialize the HTML string for attachments
    let attachmentsHtml = '';
    console.log(`notificationData.attachments : ${notificationData.attachments}`);
    // Check if there are attachments and they have the correct structure
    if (notificationData.attachments && Array.isArray(notificationData.attachments)) {
        attachmentsHtml =  notificationData.attachments
                .map(att => att.path ? `<img src="${att.path}" alt="Notification Image" style="max-width: 100%; height: auto;"/>` : '').join('\n');
    }

        console.log(notificationData.attachments);
        const mail = {
            from: mailId,
            to: 'mannpatel.co22d2@scet.ac.in',
            subject: "New Notification arrived",
            html: `
                <p>${notificationData.message}</p>
                ${attachmentsHtml}
            `
        };
    
        try {
            const response = await transporter.sendMail(mail);
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error; // Re-throw the error to allow further handling if needed
        }
    }
    



module.exports = sendMessage;

