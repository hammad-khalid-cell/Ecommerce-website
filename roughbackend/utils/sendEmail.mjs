// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "hotmail", "yahoo", "outlook", "mailgun", etc.
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password (not normal password if Gmail)
      },
    });
    
    // 2. Define mail options
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // 3. Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent: %s", info.messageId);
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
