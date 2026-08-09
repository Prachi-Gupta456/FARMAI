import transporter from "../config/nodemailer.js";
import ApiError from "./api.error.js";

export const contactUsMailSender = async ({ name, email, subject, msg }) => {
    const mail = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,       // Your support email
        replyTo: email,              // Reply goes to the user

        subject: `📩 Contact Us - ${subject}`,

        text: `
A new Contact Us message has been received.

----------------------------------------
Sender Details
----------------------------------------

Name: ${name}
Email: ${email}

----------------------------------------
Subject
----------------------------------------

${subject}

----------------------------------------
Message
----------------------------------------

${msg}
`,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        throw new ApiError(500, "Unable to send your message. Please try again later.", true);
    }
};


export const reportIssueMailSender = async ({ name, email, issueType, description, device, browser}, file) => {

    let attachments = [];

    if (file) {
        attachments.push({
            fileName: file.name,
            path: file.path
        })
    }
    const mail = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        replyTo: email,

        subject: `🐞 FarmAI Issue Report - ${issueType}`,

        text: `
A new issue has been reported.

----------------------------------------
Reporter Details
----------------------------------------

Name: ${name}
Email: ${email}

----------------------------------------
Issue Details
----------------------------------------

Issue Type: ${issueType}

Description:
${description}

----------------------------------------
Device Information
----------------------------------------

Device: ${device}
Browser: ${browser}
`,
        attachments
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        throw new ApiError(500, "Unable to send issue report.", true);
    }
};