/** @format */

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, subject, complainType, message) => {
  await transporter.sendMail({
    from: `"Customer Complain" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: `<p>Complain Type: ${complainType}</p>
    <br>
    <p>Message: ${message}</p>
    `,
  });
};

module.exports = sendVerificationEmail;
