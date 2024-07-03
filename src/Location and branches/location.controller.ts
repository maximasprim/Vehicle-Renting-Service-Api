import { Context } from "hono";
import { locationService, getLocationService, createLocationService, updateLocationService, deleteLocationService } from "./location.service";




export const listLocation = async (c: Context) =>{
  const data = await locationService();
  if ( data == null){
    return c.text("Location not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleLocation = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const location = await getLocationService(id);
  if (location == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(location, 200);
} 

export const createLocation = async (c: Context) => {
  try{
    const location = await c.req.json();
    const createdLocation = await createLocationService(location);
   if (!createdLocation){
    return c.text("Location not created!", 404)
   }
    return c.json(createdLocation, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateLocation = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const location = await c.req.json();
  try{
  //search for user
  const foundLocation = await getLocationService(id);
  if (foundLocation == undefined) 
      return c.text("Location not found!", 404);
  //get the data and update
  const res = await updateLocationService(id, location);
  //return the updated user
  if (!res )
    return c.text("Location not updated!", 404); 
    return c.json(res, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteLocation =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const location = await getLocationService(id);
 if (location == undefined) 
     return c.text("Location not found!👽", 404);
  //delete the user
  const res = await deleteLocationService(id);
  if (!res) return c.text("Location not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}