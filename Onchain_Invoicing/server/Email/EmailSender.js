// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// require('dotenv').config()

const sendEmail = async () => {
//     console.log(process.env.NODE_ENV);
//     const nodemailer = require("nodemailer")
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, // true for 465, false for other ports
//       auth: {
//         user: "invoicetestokxhack@gmail.com", // replace with your sender email address
//         pass: "okchackathon", // replace with your sender email password
//       },
//     });
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: "sender@gmail.com", // sender address
//       to: "braedenrosetest@gmail.com", // list of receivers
//       subject: "New invoice generated", // Subject line
//       text: "A new invoice has been generated.", // plain text body
//       html: "<b>A new invoice has been generated.</b>", // html body
//     });
  
   //console.log("Message sent: %s", info.messageId);
   console.log("email sent");
  };

   export default sendEmail
  