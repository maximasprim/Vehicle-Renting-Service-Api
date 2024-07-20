import { Hono } from "hono";
import { createPayment, getSinglePayment, listPayments, updatePayment, deletePayment,  } from "./payments.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {paymentsSchema } from "../validators";
import { adminRoleAuth,bothRolesAuth,userRoleAuth } from "../middleware/Auth";



//creating hono instance

export const paymentsRouter = new Hono();

//get states
paymentsRouter.get("/payments", listPayments)

//get a single Driver    

paymentsRouter.get("/payments/:id",bothRolesAuth, getSinglePayment)



//create State

// paymentsRouter.post("/payments", zValidator('json', paymentsSchema, (results, c) => {
//   if (!results.success){
//       return c.json(results.error, 400)
//   }
// }) ,createPayment)

//update Driver

paymentsRouter.put("/payments/:id",adminRoleAuth, updatePayment)

// delete Driver
paymentsRouter.delete("/payments/:id",adminRoleAuth, deletePayment)

// paymentsRouter.post("/paymentsWithstripe", createPaymentWithStripe)
paymentsRouter.post("/create-checkout-session",createPayment.createCheckoutSession);
  paymentsRouter.post("/webhook", createPayment.handleWebhook);
  paymentsRouter.get( "/test-checkout-session",createPayment.testCreateCheckoutSession);