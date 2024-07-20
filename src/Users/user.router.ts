import { Hono } from "hono";
import { createUser, getSingleUser, listUsers, updateUser, deleteUser, listUserWithBookings, listsingleuserwithBooking, listUserWithTickets,listSingleUserWithTickets } from "./user.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { userSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const userRouter = new Hono();

// get states
userRouter.get("/users",listUsers)

//get a single user    

userRouter.get("/users/:id", getSingleUser)

// 

//create a user

userRouter.post("/users", zValidator('json', userSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createUser)

//update user

userRouter.put("/users/:id", updateUser)

// delete Driver
userRouter.delete("/users/:id", deleteUser)

//get users with bookings
userRouter.get("/usersWithBookings", listUserWithBookings)
// userRouter.get("/users/withBookings/:id", listUserWithBookings)
userRouter.get("/users/withBookings/:id", listsingleuserwithBooking)

userRouter.get("/usersWithTickets", listUserWithTickets)  
userRouter.get("/users/singleUserWithTickets/:id", listSingleUserWithTickets)  