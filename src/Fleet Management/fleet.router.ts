import { Hono } from "hono";
import { createFleetManagement, getSingleFleetManagement, listFleetManagement, updateFleetManagement, deleteFleetManagement } from "./fleet.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {fleetManagementSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/Auth";



//creating hono instance

export const fleetManagementRouter = new Hono();

//get states
fleetManagementRouter.get("/fleetManagement", listFleetManagement)

//get a single Driver    

fleetManagementRouter.get("/fleetManagement/:id",userRoleAuth, getSingleFleetManagement)



//create State

fleetManagementRouter.post("/fleetManagement", zValidator('json', fleetManagementSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,adminRoleAuth,createFleetManagement)

//update Driver

fleetManagementRouter.put("/fleetManagement/:id", updateFleetManagement)

// delete Driver
fleetManagementRouter.delete("/fleetManagement/:id", deleteFleetManagement)