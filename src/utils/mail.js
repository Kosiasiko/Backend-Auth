import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "http://taskmanagelink.com"
        }
    })

    const emailtextual = mailGenerator.generatorPlaintext(options.mailgenContent);
    const emailHTML = mailGenerator.generatorPlaintext(options.mailgenContent);

    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    });
    const mail ={
        from: "mail.taskmanger@example.com",
        to: options.email,
        subject: options.subject,
        text: emailtextual,
        html: emailHTML
    };
    try {
        await transporter.sendEmail(mail)
    } catch (error) {
        console.error("Email service failed siliently. Make sure that you have provided your MAILTRAP creditials in the .env file");
        console.error("Error:", error);
    }};

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our app! we're excited to have you on board.",
            action: {
                instructions: "To verify your emwil please click on the following button",
                button: {
                    color :"#1aae5aff",
                    text: "Verify your email",
                    link: verificationUrl,
                },
            },
            outro: 
                "Need help, or have questions? just reply to this email, we'd love to help.",
        },
    };
};

const forgotPasswordMailGenContent = (username, passwordRestUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account.",
            action: {
                instructions: "To reset your password click on the following button or link",
                button: {
                    color :"rgb(7, 84, 40)",
                    text: "reset password",
                    link: passwordRestUrl,
                },
            },
            outro: 
                "Need help, or have questions? just reply to this email, we'd love to help.",
        },
    };
};

export { emailVerificationMailGenContent, forgotPasswordMailGenContent,sendEmail };