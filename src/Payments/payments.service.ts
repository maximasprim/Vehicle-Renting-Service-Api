import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import stripe from "../stripe";
import { TIPayments,TSPayments,paymentsTable,bookingsTable } from "../drizzle/schema";



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
// export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency:'usd',
//         payment_method_types: ['card'],
//       });
//       console.log(paymentIntent)
//       return paymentIntent;
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//       throw new Error('Unable to create payment intent');
//     }
//   };

  //

  export const createPaymentService = () => {
    return {
      async createCheckoutSession(booking_id: number, amount: number) {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Car Booking",
                },
                unit_amount: amount * 100, // change amount to cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: process.env.FRONTEND_URL + "/paymentsuccess",
          cancel_url: process.env.FRONTEND_URL + "/paymentcancel",
          metadata: {
            booking_id: booking_id.toString(),
          },
        });
        const payment_intent = await stripe.paymentIntents.create({
                amount: Number(amount) * 100,
                currency: 'usd',
                metadata: { booking_id:booking_id.toString() },
              });
              await db.update(bookingsTable).set({ booking_status: "confirmed" }).where(eq(bookingsTable.booking_id, booking_id));
              await db.insert(paymentsTable).values({booking_id, amount: amount ,payment_status: "payed",payment_method: 'credit card',transaction_id:payment_intent.id ,}) .execute();
        return session;
      },
  
      async handleSuccessfulPayment(session_id: string) {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const booking_id = parseInt(session.metadata!.booking_id);
        const amount_total = session.amount_total;
        if (amount_total === null) {
          throw new Error("session.amount_total is null");
        }
      },
    };
  };
