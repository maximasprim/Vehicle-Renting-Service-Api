import { Hono } from "hono";
import { createvehicle, getSinglevehicle, listvehicles, updatevehicle, deletevehicle, listVehiclesWithVehicle_Specifications,listVehiclesWithVehicle_SpecsAndFleet } from "./vehicles.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { vehicleSchema } from "../validators";



//creating hono instance

export const vehicleRouter = new Hono();

// get states
vehicleRouter.get("/vehicles", listvehicles)

//get a single vehicle    

vehicleRouter.get("/vehicles/:id", getSinglevehicle)

// 

//create a vehicle

vehicleRouter.post("/vehicles", zValidator('json', vehicleSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createvehicle)

//update vehicle

vehicleRouter.put("/vehicles/:id", updatevehicle)

// delete Driver
vehicleRouter.delete("/vehicles/:id", deletevehicle)

vehicleRouter.get("/vehiclesWithSpecs", listVehiclesWithVehicle_Specifications)

vehicleRouter.get("/vehiclesWithSpecsAndFleet", listVehiclesWithVehicle_SpecsAndFleet)