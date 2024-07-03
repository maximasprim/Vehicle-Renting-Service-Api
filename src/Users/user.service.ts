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