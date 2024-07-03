import { Context } from "hono";
import { vehicleSpecificationsService, getVehicleSpecificationsService, createVehicleSpecificationsService, updateVehicleSpecificationsService, deleteVehicleSpecificationsService  } from "./vehiclesSpecification.service";




export const listvehiclesSpecifications = async (c: Context) =>{
  const data = await vehicleSpecificationsService();
  if ( data == null){
    return c.text("vehicleSpec not Found", 404)
  }
    return c.json(data, 200);
}

export const getSinglevehicleSpecification = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const vehicleSpec = await getVehicleSpecificationsService(id);
  if (vehicleSpec == undefined){
      return c.text("vehicleSpec not found!", 404);
  }
  return c.json(vehicleSpec, 200);
} 

export const createvehicleSpec = async (c: Context) => {
  try{
    const vehicleSpec = await c.req.json();
    const createdvehicleSpec = await createVehicleSpecificationsService(vehicleSpec);
   if (!createdvehicleSpec){
    return c.text("vehicleSpec not created!", 404)
   }
    return c.json({msg: createdvehicleSpec}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updatevehicleSpec = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const vehicleSpec = await c.req.json();
  try{
  //search for vehicle
  const foundvehicleSpec = await getVehicleSpecificationsService(id);
  if (foundvehicleSpec == undefined) 
      return c.text("vehicleSpec not found!", 404);
  //get the data and update
  const res = await updateVehicleSpecificationsService(id, vehicleSpec);
  //return the updated vehicle
  if (!res )
    return c.text("vehicleSpec not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete vehicle
export const deletevehicleSpec =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the vehicle
 const vehicleSpec = await getVehicleSpecificationsService(id);
 if (vehicleSpec == undefined) 
     return c.text("vehicleSpec not found!👽", 404);
  //delete the vehicle
  const res = await deleteVehicleSpecificationsService(id);
  if (!res) return c.text("vehicleSpec not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}