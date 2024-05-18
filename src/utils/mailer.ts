import nodemailer from "nodemailer";
import verifyUserMail from "./verifyUserMail";
import resetPasswordMail from "./resetPasswordMail";

interface mailObject{
    email: string,
    emailType: string,
    userId: string
}

export const sendEmail = async({email, emailType, userId}:mailObject) => {
    try {

        let hashedToken : string = "";

        if(emailType==="VERIFY"){
            hashedToken = await verifyUserMail(userId);
        }
        else if(emailType === "RESET"){
            hashedToken = await resetPasswordMail(email);
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER!,
              pass: process.env.MAIL_PASS!
            }
        });

         

        const mailOptions = {
            from: "djr@djr.ai",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            html: emailType === "VERIFY" ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
                emailType==="VERIFY" ? "Verify your email" : "reset your password"
            } 
            or copy pase the link below in your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` : `<p>This is your OTP for reset password <div>${hashedToken}</div></p>`, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}