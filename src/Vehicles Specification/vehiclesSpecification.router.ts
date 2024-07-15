import { Hono } from "hono";
import { createvehicleSpec, getSinglevehicleSpecification, listvehiclesSpecifications, updatevehicleSpec, deletevehicleSpec } from "./vehiclesSpecification.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { vehicleSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const vehicleSpecificationRouter = new Hono();

// get states
vehicleSpecificationRouter.get("/vehiclesSpecifications", listvehiclesSpecifications)

//get a single vehicle    

vehicleSpecificationRouter.get("/vehiclesSpecifications/:id",bothRolesAuth, getSinglevehicleSpecification)

// 

//create a vehicle

vehicleSpecificationRouter.post("/vehiclesSpecifications", zValidator('json', vehicleSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createvehicleSpec)

//update vehicle

vehicleSpecificationRouter.put("/vehiclesSpecifications/:id",adminRoleAuth, updatevehicleSpec)

// delete Driver
vehicleSpecificationRouter.delete("/vehiclesSpecifications/:id",adminRoleAuth, deletevehicleSpec)