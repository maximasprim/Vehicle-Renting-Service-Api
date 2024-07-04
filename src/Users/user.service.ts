import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIUsers,TSUsers,usersTable } from "../drizzle/schema";



export const usersService = async ():Promise<TSUsers[] | null> =>{
    return await db.query.usersTable.findMany();

}

export const getUserService = async (id: number): Promise<TSUsers | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.user_id, id)
    })
}

export const createUserService = async (user: TIUsers): Promise<TIUsers> => {
    await db.insert(usersTable).values(user)
    return user;
}

export const updateUserService = async (id: number, user: TIUsers) => {
    await db.update(usersTable).set(user).where(eq(usersTable.user_id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.user_id, id))
    return "User deleted successfully";
}

export const getUserWithBookingsService = async (): Promise<
  TSUsers[] | null
> => {
  return await db.query.usersTable.findMany({
    with: {
      bookings: {
        columns: {
          booking_id: true,
          vehicle_id: true,
          location_id: true,
          booking_date: true,
          return_date: true,
          total_amount: true,
        },
      },
    },
  });
};

export const getSingleUserWithBookingService = async (id:number): Promise<TSUsers[] | null> =>{
    return await db.query.usersTable.findMany({
        where: eq(usersTable.user_id,id),
        with:{
            bookings: {
                columns: {
                  booking_id: true,
                  vehicle_id: true,
                  location_id: true,
                  booking_date: true,
                  return_date: true,
                  total_amount: true,
                },
              },
            }
    })
}

export const getUserWithTicketsService = async (): Promise<
  TSUsers[] | null
> => {
  return await db.query.usersTable.findMany({
    with: {
      supportTickets: {
        columns: {
          ticket_id: true,
          user_id: true,
          subject: true,
          description: true,
          status: true
          
        },
      },
    },
  });
};