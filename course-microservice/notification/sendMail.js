import nodemailer from "nodemailer";
import { config } from "dotenv";
import axios from "axios";

config();

const USER_MICRO_SERVICE_BASE_URL = "http://localhost:4001";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL, // admin gmail Address
    pass: process.env.PASS,
  },
});

const Approval = async () => {
  try {
    const Users = await axios.get(`${USER_MICRO_SERVICE_BASE_URL}/users`);

    const instructors = await users.find({ role: "instructor" });

    // Extract email addresses of instructors
    const instructorEmails = instructors.map((instructor) => instructor.email);

    const mailOptions = {
      from: {
        name: "Admin Approval",
        address: process.env.EMAIL,
      }, // sender address
      to: instructorEmails.join(","), //list of receivers
      subject: "Your Course has been Approved!",
      text: "Congratulations! Your course has been approved by the Admin. Thank you for your contribution.",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("notification sent to instructors:", info.response);
  } catch (error) {
    console.error("Error sending notification to instructors:", error);
    errorLogger.error("Error sending notification to instructors:", error);
  }
};
export default Approval;
