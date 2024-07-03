import { Hono } from "hono";
import { createTicket, getSingleTicket, listTicket, updateTicket, deleteTicket } from "./customer.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {ticketSchema } from "../validators";



//creating hono instance

export const ticketRouter = new Hono();

//get states
ticketRouter.get("/ticket", listTicket)

//get a single Driver    

ticketRouter.get("/ticket/:id", getSingleTicket)



//create State

ticketRouter.post("/ticket", zValidator('json', ticketSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createTicket)

//update Driver

ticketRouter.put("/ticket/:id", updateTicket)

// delete Driver
ticketRouter.delete("/ticket/:id", deleteTicket)