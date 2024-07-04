import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIBookings,TSBookings,bookingsTable } from "../drizzle/schema";



export const bookingsService = async ():Promise<TSBookings[] | null> =>{
    return await db.query.bookingsTable.findMany();

}

export const getBookingsService = async (id: number): Promise<TSBookings | undefined> => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.booking_id, id)
    })
}

export const createBookingsService = async (booking: TIBookings): Promise<TIBookings> => {
    await db.insert(bookingsTable).values(booking)
    return booking;
}

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