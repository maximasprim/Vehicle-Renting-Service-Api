import { Hono } from "hono";
import { createBooking, getSingleBooking, listBookings, updateBooking, deleteBooking,listBookingsWithVehicleAndUserAndPayments } from "./Bookings.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {bookingsSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth,userRoleAuth } from "../middleware/Auth";



//creating hono instance

export const bookingsRouter = new Hono();

//get states
bookingsRouter.get("/bookings", listBookings)

//get a single Driver    

bookingsRouter.get("/bookings/:id",userRoleAuth, getSingleBooking)



//create State

bookingsRouter.post("/bookings", zValidator('json', bookingsSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createBooking)

//update Driver

bookingsRouter.put("/bookings/:id",bothRolesAuth, updateBooking)

// delete Driver
bookingsRouter.delete("/bookings/:id", adminRoleAuth,deleteBooking)

bookingsRouter.get("/bookingsWith-vehicle-and-user-and-payments",bothRolesAuth, listBookingsWithVehicleAndUserAndPayments)