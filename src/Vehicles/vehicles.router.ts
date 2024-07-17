import { Hono } from "hono";
import { createvehicle, getSinglevehicle, listvehicles, updatevehicle, deletevehicle, listVehiclesWithVehicle_Specifications,listVehiclesWithVehicle_SpecsAndFleet } from "./vehicles.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { vehicleSchema } from "../validators";
import { bothRolesAuth,adminRoleAuth,userRoleAuth } from "../middleware/Auth";



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

vehicleRouter.put("/vehicles/:id",adminRoleAuth, updatevehicle)

// delete Driver
vehicleRouter.delete("/vehicles/:id", deletevehicle)

vehicleRouter.get("/vehiclesWithSpecs",bothRolesAuth, listVehiclesWithVehicle_Specifications)

vehicleRouter.get("/vehiclesWithSpecsAndFleet",adminRoleAuth, listVehiclesWithVehicle_SpecsAndFleet)