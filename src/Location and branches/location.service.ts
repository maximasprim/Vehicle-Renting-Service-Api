import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TILocations,TSLocations,locationsTable } from "../drizzle/schema";



export const locationService = async ():Promise<TSLocations[] | null> =>{
    return await db.query.locationsTable.findMany();

}

export const getLocationService = async (id: number): Promise<TSLocations | undefined> => {
    return await db.query.locationsTable.findFirst({
        where: eq(locationsTable.location_id, id)
    })
}

export const createLocationService = async (location: TILocations): Promise<TILocations> => {
    await db.insert(locationsTable).values(location)
    return location;
}

export const updateLocationService = async (id: number, location: TILocations) => {
    await db.update(locationsTable).set(location).where(eq(locationsTable.location_id, id))
    return location;
}

export const deleteLocationService = async (id: number) => {
    await db.delete(locationsTable).where(eq(locationsTable.location_id, id))
    return "Location deleted successfully";
}