import "dotenv/config"
import nodemailer from 'nodemailer'
import { error, info } from "console"
import cron from 'node-cron';
import ejs from 'ejs'

// export const mailFunction = ( to: string, subject: string, text: string ) =>{
//     //transporter
//     const transporter =  nodemailer.createTransport({
//         service: 'gmail',
//         auth:{
//             user: process.env.Email,
//             pass: process.env.PASSWORD
//         }
//     })
//     const mailOptions = {
//         from:process.env.EMAIL,
//         to:"michaelmwasame16@gmail.com",
//         subject:"Confirmation mail",
//         text:"Registration successful"

//     }
//     // const mailOptions = {
//     //     from:process.env.EMAIL,
//     //     to,
//     //     subject,
//     //     text
//     // }

//     transporter.sendMail(mailOptions,(error, info)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(`Email sent:${info.response} `)
//         }
//     })
// }
// export default mailFunction;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Define your inline templates
const templates: { [key: string]: string } = {
    'welcome-email': `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: rgb(79, 96, 194);
                background-image: url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTY2MTU3Ny13aWtpbWVkaWEtaW1hZ2Uta293YXBlZWouanBn.jpg'); /* Replace with your image path */
                background-size: cover;
                background-position: center;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 80%;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 10px 0;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }
            .content {
                margin: 20px 0;
            }
            .footer {
                background-color: #4CAF50;
                color: white;
                padding: 10px 0;
                text-align: center;
                border-radius: 0 0 10px 10px;
            }
            .button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                margin: 10px 0;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Maximus CarBook</h1>
            </div>
            <div class="content">
                <p>Dear <strong><%= username %></strong>,</p>
                <p>Thank you for registering. Here are your credentials:</p>
                <p><strong>Username:</strong> <%= username %></p>
                <p><strong>Password:</strong> <%= password %></p>
                <a href="https://restaurantapp.azurewebsites.net/api" class="button">Get Started</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 Maximus CarBook. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    
    `
};

export const mailFunction = async (to: string, subject: string, templateName: string, templateData: any) => {
    try {
        const template = templates[templateName];
        if (!template) {
            throw new Error('Template not found');
        }
        const html = ejs.render(template, templateData);

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'michaelmwasame16@gmail.com',
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export default mailFunction;