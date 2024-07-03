import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {TIVehicleSpecifications,TSVehicleSpecifications,vehicleSpecificationsTable } from "../drizzle/schema";



export const vehicleSpecificationsService = async ():Promise<TSVehicleSpecifications[] | null> =>{
    return await db.query.vehicleSpecificationsTable.findMany();

}

export const getVehicleSpecificationsService = async (id: number): Promise<TSVehicleSpecifications | undefined> => {
    return await db.query.vehicleSpecificationsTable.findFirst({
        where: eq(vehicleSpecificationsTable.vehicleSpec_id, id)
    })
}

export const createVehicleSpecificationsService = async (vehicleSpec: TIVehicleSpecifications): Promise<TIVehicleSpecifications> => {
    await db.insert(vehicleSpecificationsTable).values(vehicleSpec)
    return vehicleSpec;
}

export const updateVehicleSpecificationsService = async (id: number, vehicleSpec: TIVehicleSpecifications) => {
    await db.update(vehicleSpecificationsTable).set(vehicleSpec).where(eq(vehicleSpecificationsTable.vehicleSpec_id, id))
    return "vehicleSpec updated successfully";
}

export const deleteVehicleSpecificationsService = async (id: number) => {
    await db.delete(vehicleSpecificationsTable).where(eq(vehicleSpecificationsTable.vehicleSpec_id, id))
    return "vehicleSpec deleted successfully";
}