import { migrate } from "drizzle-orm/neon-http/migrator";
import "dotenv/config";
 
import db from "./db";
 
async function migration() {
    try {
        console.log("======Migration Started ======");
        await migrate(db, { migrationsFolder: __dirname + "/migrations" });
        console.log("======Migration Ended======");
        process.exit(0);
      } catch (error) {
        console.error("Migration failed with error: ", error);
        process.exit(1);
      }
    }
 
migration().catch((err) => {
     console.error(err)
     process.exit(1);
})