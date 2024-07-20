import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config";
import { HTTPException } from 'hono/http-exception';
import { type Context } from "hono";
import { userRouter } from './Users/user.router';
import mailFunction from "./mail";
import cron from 'node-cron'
import { vehicleRouter } from './Vehicles/vehicles.router';
import { vehicleSpecificationRouter } from './Vehicles Specification/vehiclesSpecification.router';
import { bookingsRouter } from './Bookings/Bookings.router';
import { paymentsRouter } from './Payments/payments.router';
import { ticketRouter } from './Customer support Tickets/customer.router';
import { locationRouter } from './Location and branches/location.router';
import { fleetManagementRouter } from './Fleet Management/fleet.router';
import { authRouter } from './Authentication/auth.router';
import { cors } from 'hono/cors';
import nodemailer from 'nodemailer';
// import { json } from 'hono/json';

const app = new Hono()

//enable cors
app.use(cors());
app.use('*', cors());

app.use(cors({
  origin: '*',
  allowMethods : ['GET','POST','PUT','DELETE','OPTIONS'],
  allowHeaders : ['Content-Type','Authorization'],
}));

app.get('/', (c) => {
  return c.text('Server is Running Fine!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

app.route('/', userRouter)//users
app.route('/', vehicleRouter)
app.route('/', vehicleSpecificationRouter)  
app.route('/', bookingsRouter)
app.route('/', paymentsRouter)
app.route('/', ticketRouter)
app.route('/', locationRouter)
app.route('/', fleetManagementRouter)
app.route('/', authRouter)


// //sending contact us 
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// // Send email function
// const sendEmail = async ({ to, subject, html }: any, p0: string, htmlContent: string) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to,
//       subject,
//       html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent: ${info.response}`);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Failed to send email');
//   }
// };

// // Endpoint to handle contact form submission
// app.post('/send-contact-email', async (ctx) => {
//   const { firstName, lastName, email, phoneNumber, message } = await ctx.req.json();

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body { font-family: Arial, sans-serif; }
//             .container { width: 80%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
//             .header { text-align: center; margin-bottom: 20px; }
//             .content { margin-bottom: 20px; }
//             .footer { text-align: center; font-size: 0.9em; color: #777; }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>Contact Us Form Submission</h1>
//             </div>
//             <div class="content">
//                 <p><strong>First Name:</strong> ${firstName}</p>
//                 <p><strong>Last Name:</strong> ${lastName}</p>
//                 <p><strong>Email:</strong> ${email}</p>
//                 <p><strong>Phone Number:</strong> ${phoneNumber}</p>
//                 <p><strong>Message:</strong></p>
//                 <p>${message}</p>
//             </div>
//             <div class="footer">
//                 <p>&copy; 2024 Your Company. All rights reserved.</p>
//             </div>
//         </div>
//     </body>
//     </html>
//   `;

//   try {
//     await sendEmail('your-email@example.com', 'Contact Us Form Submission', htmlContent);
//     return ctx.json({ message: 'Email sent successfully!' }, 200);
//   } catch (error) {
//     return ctx.json({ error: error.toString() }, 500);
//   }
// });

// app.fire();