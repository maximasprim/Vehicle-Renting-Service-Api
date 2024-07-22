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


//contact us
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

app.post('/send-email', async (c) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = await c.req.json();

    const mailOptions = {
      from: email,
      to: 'michaelmwasame6@gmail.com',
      subject: 'Contact Form Submission',
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    return c.text('Email sent', 200);
  } catch (error: any) {
    return c.text(error.toString(), 500);
  }
});