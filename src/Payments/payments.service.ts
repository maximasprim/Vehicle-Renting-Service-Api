import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import stripe from "../stripe";
import { TIPayments,TSPayments,paymentsTable } from "../drizzle/schema";



export const paymentsService = async ():Promise<TSPayments[] | null> =>{
    return await db.query.paymentsTable.findMany();

}

export const getPaymentsService = async (id: number): Promise<TSPayments | undefined> => {
    return await db.query.paymentsTable.findFirst({
        where: eq(paymentsTable.payment_id, id)
    })
}

export const createPaymentsService = async (payment: TIPayments): Promise<TIPayments> => {
    await db.insert(paymentsTable).values(payment)
    return payment;
}

export const updatePaymentsService = async (id: number, payment: TIPayments) => {
    await db.update(paymentsTable).set(payment).where(eq(paymentsTable.payment_id, id))
    return payment;
}

export const deletePaymentsService = async (id: number) => {
    await db.delete(paymentsTable).where(eq(paymentsTable.payment_id, id))
    return "Payment deleted successfully";
}

//payments with stripe
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency:'usd',
        payment_method_types: ['card'],
      });
      console.log(paymentIntent)
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Unable to create payment intent');
    }
  };