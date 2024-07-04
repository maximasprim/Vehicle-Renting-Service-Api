import { Context } from "hono";
import { paymentsService, getPaymentsService, createPaymentsService, updatePaymentsService, deletePaymentsService,createPaymentIntent } from "./payments.service";




export const listPayments = async (c: Context) =>{
  const data = await paymentsService();
  if ( data == null){
    return c.text("Payment not Found", 404)
  }
    return c.json(data, 200);
}

export const getSinglePayment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const payment = await getPaymentsService(id);
  if (payment == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(payment, 200);
} 

export const createPayment = async (c: Context) => {
  try{
    const payment = await c.req.json();
    const createdPayment = await createPaymentsService(payment);
   if (!createdPayment){
    return c.text("Payment not created!", 404)
   }
    return c.json(createdPayment, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updatePayment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const payment = await c.req.json();
  try{
  //search for user
  const foundPayment = await getPaymentsService(id);
  if (foundPayment == undefined) 
      return c.text("Payment not found!", 404);
  //get the data and update
  const res = await updatePaymentsService(id, payment);
  //return the updated user
  if (!res )
    return c.text("payment not updated!", 404); 
    return c.json(res, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deletePayment =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const payment = await getPaymentsService(id);
 if (payment == undefined) 
     return c.text("Payment not found!👽", 404);
  //delete the user
  const res = await deletePaymentsService(id);
  if (!res) return c.text("Payments not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//payments with stripe

export const createPaymentWithStripe = async (c: Context) => {
  try {
    const { amount } = await c.req.json();
    console.log(amount)
    const paymentIntent = await createPaymentIntent(amount);

    return c.json({ clientSecret: paymentIntent.client_secret }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};