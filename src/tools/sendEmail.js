const nodemailer = require('nodemailer');
// qq kmlhzvghjsvqbbaj
// 163 MJVUOSFGQDWYLWIT

// Create a transporter using your email service's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: '18376621755@163.com',
    pass: 'MJVUOSFGQDWYLWIT',
  },
});

// Email content tmpl
const mailOptions = {
  from: '18376621755@163.com',
  to: 'bmlishizeng@gmail.com',
  subject: '✨✨!SubScribe Notice!✨',
  text: `
   Hi Joney 你下面的新消息:
   
  `,
};

const sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Send the email
module.exports = {
  sendMail,
};
