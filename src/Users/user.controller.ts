import { Context } from "hono";
import { usersService, getUserService, createUserService, updateUserService, deleteUserService, getUserWithBookingsService, getSingleUserWithBookingService,getUserWithTicketsService } from "./user.service";




export const listUsers = async (c: Context) =>{
  const data = await usersService();
  if ( data == null){
    return c.text("User not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await getUserService(id);
  if (user == undefined){
      return c.text("user not found!", 404);
  }
  return c.json(user, 200);
} 

export const createUser = async (c: Context) => {
  try{
    const user = await c.req.json();
    const createdUser = await createUserService(user);
   if (!createdUser){
    return c.text("user not created!", 404)
   }
    return c.json(createdUser, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  console.log(user)
  try{
  //search for user
  const founduser = await getUserService(id);
  if (founduser == undefined) 
      return c.text("user not found!", 404);
  //get the data and update
  const res = await updateUserService(id, user);
  //return the updated user

  if (!res )
    return c.text("user not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete user
export const deleteUser =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const user = await getUserService(id);
 if (user == undefined) 
     return c.text("User not found!👽", 404);
  //delete the user
  const res = await deleteUserService(id);
  if (!res) return c.text("User not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//user relations

export const listUserWithBookings = async (c: Context) =>{
  const data = await getUserWithBookingsService();
  if ( data == null){
    return c.text("user not Found", 404)
  }
    return c.json(data, 200);
}

export const listsingleuserwithaddress = async (c: Context) =>{
  const id = parseInt(c.req.param("id"));
  const data = await getSingleUserWithBookingService(id);
  if ( data == null){
    return c.text("user not Found", 404)
  }
    return c.json(data, 200);
}

export const listUserWithTickets = async (c: Context) =>{
  const data = await getUserWithTicketsService();
  if ( data == null){
    return c.text("user not Found", 404)
  }
    return c.json(data, 200);
}