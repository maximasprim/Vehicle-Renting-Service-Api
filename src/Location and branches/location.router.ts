import { Hono } from "hono";
import { createLocation, getSingleLocation, listLocation, updateLocation, deleteLocation } from "./location.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {locationSchema } from "../validators";



//creating hono instance

export const locationRouter = new Hono();

//get states
locationRouter.get("/location", listLocation)

//get a single Driver    

locationRouter.get("/location/:id", getSingleLocation)



//create State

locationRouter.post("/location", zValidator('json', locationSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createLocation)

//update Driver

locationRouter.put("/location/:id", updateLocation)

// delete Driver
locationRouter.delete("/location/:id", deleteLocation)