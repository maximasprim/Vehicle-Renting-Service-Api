import { Hono } from "hono";
import { createPayment, getSinglePayment, listPayments, updatePayment, deletePayment, createPaymentWithStripe } from "./payments.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {paymentsSchema } from "../validators";



//creating hono instance

export const paymentsRouter = new Hono();

//get states
paymentsRouter.get("/payments", listPayments)

//get a single Driver    

paymentsRouter.get("/payments/:id", getSinglePayment)



//create State

paymentsRouter.post("/payments", zValidator('json', paymentsSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createPayment)

//update Driver

paymentsRouter.put("/payments/:id", updatePayment)

// delete Driver
paymentsRouter.delete("/payments/:id", deletePayment)

paymentsRouter.post("/paymentsWithstripe", createPaymentWithStripe)