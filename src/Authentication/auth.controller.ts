import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userloginService } from "./auth.service";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";
import { mailFunction } from "../mail"

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const pass = user.password;
    const hashedPassword = await bycrpt.hash(pass, 10);
    user.password = hashedPassword;

    const createdUser = await createAuthUserService(user);

    if (!createdUser) {
      return c.text("user not created!", 404);
    }

    //send welcome email
    const subject = 'Welcome to Maximus CarBook';
    const text = `Your username: ${user.username}\nYour password: ${pass}`;
    await mailFunction(user.email, subject, 'welcome-email', { username: user.username, password: pass });


    return c.json({ msg: createdUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const user = await c.req.json();

    //check user exist
    const userExist = await userloginService(user);
    if (userExist === null) {
      return c.json({ error: "User not found" }, 404);
    }
    const userMatch = await bycrpt.compare(
      user.password as string,
      userExist?.password as string
    );
    if (!userMatch) {
      return c.json({ error: "invalid Credentials!" }, 401);
    } else {
      //generate a jwt token

      //create a payload
      const payload = {
        sub: userExist?.username,
        role: userExist?.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 180, // 3 hour  => SESSION EXPIRATION
      }
      let secret = process.env.JWT_SECRET as string;
      const token = await sign(payload, secret);
      let user = userExist?.user;
      let role = userExist?.role;
     return c.json({ token, user: { role, ...user } }, 200);  // return token and user details
    }
        
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};