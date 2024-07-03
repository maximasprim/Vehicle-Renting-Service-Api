import { Context } from "hono";
import { ticketService, getTicketService, createTicketService, updateTicketService, deleteTicketService } from "./customer.service";




export const listTicket = async (c: Context) =>{
  const data = await ticketService();
  if ( data == null){
    return c.text("Ticket not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleTicket = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const ticket = await getTicketService(id);
  if (ticket == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(ticket, 200);
} 

export const createTicket = async (c: Context) => {
  try{
    const ticket = await c.req.json();
    const createdTicket = await createTicketService(ticket);
   if (!createdTicket){
    return c.text("Ticket not created!", 404)
   }
    return c.json(createdTicket, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateTicket = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const ticket = await c.req.json();
  try{
  //search for user
  const foundTicket = await getTicketService(id);
  if (foundTicket == undefined) 
      return c.text("Ticket not found!", 404);
  //get the data and update
  const res = await updateTicketService(id, ticket);
  //return the updated user
  if (!res )
    return c.text("Ticket not updated!", 404); 
    return c.json(res, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteTicket =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const ticket = await getTicketService(id);
 if (ticket == undefined) 
     return c.text("Ticket not found!👽", 404);
  //delete the user
  const res = await deleteTicketService(id);
  if (!res) return c.text("Ticket not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}