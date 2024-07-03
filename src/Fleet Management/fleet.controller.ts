import { Context } from "hono";
import { fleetService, getFleetManagementService, createFleetManagementService, updateFleetManagementService, deleteFleetManagementService } from "./fleet.service";




export const listFleetManagement = async (c: Context) =>{
  const data = await fleetService();
  if ( data == null){
    return c.text("FleetManagement not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleFleetManagement = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const fleet = await getFleetManagementService(id);
  if (fleet == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(fleet, 200);
} 

export const createFleetManagement = async (c: Context) => {
  try{
    const fleet = await c.req.json();
    const createdFleetManagement = await createFleetManagementService(fleet);
   if (!createdFleetManagement){
    return c.text("FleetManagement not created!", 404)
   }
    return c.json(createdFleetManagement, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateFleetManagement = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const fleet = await c.req.json();
  try{
  //search for user
  const foundFleetManagement = await getFleetManagementService(id);
  if (foundFleetManagement == undefined) 
      return c.text("FleetManagement not found!", 404);
  //get the data and update
  const res = await updateFleetManagementService(id, fleet);
  //return the updated user
  if (!res )
    return c.text("FleetManagement not updated!", 404); 
    return c.json(res, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteFleetManagement =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const fleet = await getFleetManagementService(id);
 if (fleet == undefined) 
     return c.text("FleetManagement not found!👽", 404);
  //delete the user
  const res = await deleteFleetManagementService(id);
  if (!res) return c.text("FleetManagement not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}