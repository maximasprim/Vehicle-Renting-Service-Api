import { authenticationTable, TIAuthentication, TSAuthentication } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";
import { mailFunction } from "../mail"

export const createAuthUserService = async (user:TIAuthentication): Promise<string | null > => {
    //await db.insert(AuthOnUsersTable).values(user)
    console.log('User object received:', user);
//added
    const { username, password} = user;
        
        // Sending welcome email to the user
        // Ensure username is defined and of type string before calling mailFunction
         // Ensure username is defined and of type string
    if (!username || typeof username !== 'string') {
        throw new Error('Invalid username');
    }

    await db.insert(authenticationTable).values(user);

    // Sending welcome email to the user
    await mailFunction(username, 'Welcome to My Restaurant API', 'welcome-email', { username, password });

        return "User created successfully";
    // return "User created successfully";

}

export const userloginService = async (user: TSAuthentication) =>{
  const { username, password } = user;
  return await db.query.authenticationTable.findFirst({
    columns:{
        username: true,
        role: true,
        password: true
    }, where: sql` ${authenticationTable.username} = ${username}`,
    with: {
        user: {
            columns:{
                name: true,
                contact_phone: true,
                email: true,
                confirmation_code: true,
                id: true
            }
        }
    }

  })
}