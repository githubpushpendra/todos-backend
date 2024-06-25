require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    debug: true,
    logger: true
})

const sendOtp = async(email) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Otp Code for TaskGuardPro',
        text: 'Your OTP code is 8767'
    };
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log("Res is: ", info)
    } catch(e){
        console.log("Getting err in sending mail: ", e.message);
    }
}

sendOtp('code.pushpendra@gmail.com')