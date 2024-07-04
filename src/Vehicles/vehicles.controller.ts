import { Context } from "hono";
import { vehiclesService, getVehicleService, createVehicleService, updateVehicleService, deleteVehicleService, getVehicleWithVehicle_SpecificationsService,getVehicleWithVehicleSpecsAndFleetManagementService  } from "./vehicles.service";




export const listvehicles = async (c: Context) =>{
  const data = await vehiclesService();
  if ( data == null){
    return c.text("vehicle not Found", 404)
  }
    return c.json(data, 200);
}

export const getSinglevehicle = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const vehicle = await getVehicleService(id);
  if (vehicle == undefined){
      return c.text("vehicle not found!", 404);
  }
  return c.json(vehicle, 200);
} 

export const createvehicle = async (c: Context) => {
  try{
    const vehicle = await c.req.json();
    const createdvehicle = await createVehicleService(vehicle);
   if (!createdvehicle){
    return c.text("vehicle not created!", 404)
   }
    return c.json({msg: createdvehicle}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updatevehicle = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const vehicle = await c.req.json();
  try{
  //search for vehicle
  const foundvehicle = await getVehicleService(id);
  if (foundvehicle == undefined) 
      return c.text("vehicle not found!", 404);
  //get the data and update
  const res = await updateVehicleService(id, vehicle);
  //return the updated vehicle
  if (!res )
    return c.text("vehicle not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete vehicle
export const deletevehicle =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the vehicle
 const vehicle = await getVehicleService(id);
 if (vehicle == undefined) 
     return c.text("vehicle not found!👽", 404);
  //delete the vehicle
  const res = await deleteVehicleService(id);
  if (!res) return c.text("vehicle not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//vehicles relations
export const listVehiclesWithVehicle_Specifications = async (c: Context) =>{
  const data = await getVehicleWithVehicle_SpecificationsService();
  if ( data == null){
    return c.text("vehicle not Found", 404)
  }
    return c.json(data, 200);
}
export const listVehiclesWithVehicle_SpecsAndFleet = async (c: Context) =>{
  const data = await getVehicleWithVehicleSpecsAndFleetManagementService();
  if ( data == null){
    return c.text("vehicle not Found", 404)
  }
    return c.json(data, 200);
}
