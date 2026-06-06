const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendBookingEmail = async(email, userName, eventTitle)=>{
     try{
        const mailOptions={
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Booking confirmed : ${eventTitle}`,
           
            html:`
                <h2>Hi ${userName}</h2>
                <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed</p>
                <p>Thank you for choosing Eventora.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Booking email sent to ${email} for ${eventTitle}`);
    }catch(error){
        console.error(`Failed to send booking email to ${email}:`, error);
    }
}

exports.sendOtpEmail = async(email, otp, type)=>{
    try{
        const title = type === 'account_verification' ? 'Verify your Eventora Account' : 'Eventora Booking Verification'
        const msg = type === 'account_verification'
        ? 'Please use the following OTP to verify your new Eventora account.'
        : 'Please use the following OTP to verify and confirm your event booking.'

        const mailOptions={
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,
           
            html:`
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
                    
                    <!-- Header -->
                    <div style="background-color: #4F46E5; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">🎉 Eventora</h1>
                    </div>

                    <!-- Body -->
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h2 style="color: #1F2937; font-size: 20px; margin-bottom: 10px;">${title}</h2>
                        <p style="color: #6B7280; font-size: 15px; line-height: 1.6;">${msg}</p>

                        <!-- OTP Box -->
                        <div style="text-align: center; margin: 30px 0;">
                            <span style="
                                display: inline-block;
                                background-color: #EEF2FF;
                                color: #4F46E5;
                                font-size: 36px;
                                font-weight: bold;
                                letter-spacing: 10px;
                                padding: 16px 32px;
                                border-radius: 8px;
                                border: 2px dashed #4F46E5;
                            ">${otp}</span>
                        </div>

                        <p style="color: #6B7280; font-size: 14px; line-height: 1.6;">
                            ⏱️ This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.
                        </p>

                        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />

                        <p style="color: #9CA3AF; font-size: 13px;">
                            If you did not request this, please ignore this email or contact our support team immediately.
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="color: #9CA3AF; font-size: 12px;">© ${new Date().getFullYear()} Eventora. All rights reserved.</p>
                    </div>

                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email} for ${type}`);
    }catch(error){
        console.error(`Failed to send OTP email to ${email} for ${type}:`, error);
    }
}

