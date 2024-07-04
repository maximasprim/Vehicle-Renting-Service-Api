import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config";
import { HTTPException } from 'hono/http-exception';
import { type Context } from "hono";
import { userRouter } from './Users/user.router';
import { vehicleRouter } from './Vehicles/vehicles.router';
import { vehicleSpecificationRouter } from './Vehicles Specification/vehiclesSpecification.router';
import { bookingsRouter } from './Bookings/Bookings.router';
import { paymentsRouter } from './Payments/payments.router';
import { ticketRouter } from './Customer support Tickets/customer.router';
import { locationRouter } from './Location and branches/location.router';
import { fleetManagementRouter } from './Fleet Management/fleet.router';
import { authRouter } from './Authentication/auth.router';

const app = new Hono()

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