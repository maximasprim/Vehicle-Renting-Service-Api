import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIBookings,TSBookings,bookingsTable,TIPayments,paymentsTable } from "../drizzle/schema";
import {createPaymentsService} from "../Payments/payments.service";




export const bookingsService = async ():Promise<TSBookings[] | null> =>{
    return await db.query.bookingsTable.findMany();

}

export const getBookingsService = async (id: number): Promise<TSBookings | undefined> => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.booking_id, id)
    })
}

export const createBookingsService = async (booking: TIBookings): Promise<TIBookings> => {
  const { total_amount, user_id, booking_id, location_id, return_date, booking_date } = booking;

  try {
    // Ensure amount is a number
    const amount = Number(total_amount);

    // Create a payment record
    const paymentRecord: TIPayments = {
      payment_id: booking_id,
      booking_id: booking_id,
      amount: total_amount,
      payment_status: "Pending", // or appropriate status
      payment_date: new Date().toISOString(), // Current date
      payment_method: "Credit Card", // or appropriate method
      transaction_id: `${booking_id}_${new Date().getTime()}`, // Example transaction ID
      
    };

    // Insert booking into bookings table
    await db.insert(bookingsTable).values(booking);

    // Insert payment record into payments table
    await db.insert(paymentsTable).values(paymentRecord);

    return booking;
  } catch (error) {
    console.error('Error creating booking and payment:', error);
    throw new Error('Unable to create booking and payment');
  }
};
export const updateBookingsService = async (id: number, booking: TIBookings) => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.booking_id, id))
    return booking;
}

export const deleteBookingsService = async (id: number) => {
    await db.delete(bookingsTable).where(eq(bookingsTable.booking_id, id))
    return "Booking deleted successfully";
}

export const getBookingWithVehicleAndPaymentsAndUserService = async (): Promise<
  TSBookings[] | null
> => {
  return await db.query.bookingsTable.findMany({
    with: {
      vehicle: {
        columns: {
          vehicle_id: true,
          availability: true,
          
        },
      },
      payments: {
        columns: {
          payment_id: true,
          payment_status: true,
          amount: true,
          payment_method: true,
          transaction_id: true,
        },
      },
      user: {
        columns: {
          user_id: true,
          full_name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};