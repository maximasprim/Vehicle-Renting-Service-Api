import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config";
import { HTTPException } from 'hono/http-exception';
import { type Context } from "hono";
import { userRouter } from './Users/user.router';
import { vehicleRouter } from './Vehicles/vehicles.router';
import { vehicleSpecificationRouter } from './Vehicles Specification/vehiclesSpecification.router';
import { bookingsRouter } from './Bookings/Bookings.router';

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