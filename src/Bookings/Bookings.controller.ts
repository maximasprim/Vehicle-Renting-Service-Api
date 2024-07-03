import { Context } from "hono";
import { bookingsService, getBookingsService, createBookingsService, updateBookingsService, deleteBookingsService } from "./Bookings.service";




export const listBookings = async (c: Context) =>{
  const data = await bookingsService();
  if ( data == null){
    return c.text("Booking not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleBooking = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const booking = await getBookingsService(id);
  if (booking == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(booking, 200);
} 

export const createBooking = async (c: Context) => {
  try{
    const book = await c.req.json();
    const createdBooking = await createBookingsService(book);
   if (!createdBooking){
    return c.text("Booking not created!", 404)
   }
    return c.json(createdBooking, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateBooking = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const booking = await c.req.json();
  try{
  //search for user
  const foundBooking = await getBookingsService(id);
  if (foundBooking == undefined) 
      return c.text("Booking not found!", 404);
  //get the data and update
  const res = await updateBookingsService(id, booking);
  //return the updated user
  if (!res )
    return c.text("booking not updated!", 404); 
    return c.json(res, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteBooking =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const booking = await getBookingsService(id);
 if (booking == undefined) 
     return c.text("Booking not found!👽", 404);
  //delete the user
  const res = await deleteBookingsService(id);
  if (!res) return c.text("Booking not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}