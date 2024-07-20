import { authenticationTable,usersTable, TIAuthentication, TSAuthentication } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";
import { mailFunction } from "../mail"

export const createAuthUserService = async (user: any) => {
    try {
      // Insert user into `users` table
      const createdUser = await db.insert(usersTable).values({
        full_name: user.username,
        email: user.email,
        contact_phone: user.contact_phone,
        address: user.address,
        role: user.role || 'user'
      }).returning();
  
      // Extract the created user ID
      const userId = createdUser[0].user_id;
  
      // Insert user into `auth_user` table
      await db.insert(authenticationTable).values({
        user_id: userId,
        password: user.password,
        username: user.username,
        role:user.role
      }).returning();
  
    //   // Ensure username is defined and of type string before calling mailFunction
    //   if (!user.username || typeof user.username !== 'string') {
    //     throw new Error('Invalid username');
    //   }
  
    //   // Sending welcome email to the user
    //   await mailFunction(user.username, 'Welcome to Maximus CarBook', 'welcome-email', { username: user.username, password: user.password });
    //   console.log("Authservices: Sent welcome email");
  
      return createdUser[0]; // Return the created user
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  };

export const userloginService = async (user: TSAuthentication) =>{
  const { username, password } = user;
  return await db.query.authenticationTable.findFirst({
    columns:{
        auth_id: true,
        username: true,
        role: true,
        password: true
    }, where: sql` ${authenticationTable.username} = ${username}`,
    with: {
        user: {
            columns:{
              user_id: true,
                full_name: true,
                contact_phone: true,
                address: true,
                role: true,
            }
        }
    }

  })
}