import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {TIVehicles,TSVehicles,vehiclesTable } from "../drizzle/schema";



export const vehiclesService = async ():Promise<TSVehicles[] | null> =>{
    return await db.query.vehiclesTable.findMany();

}

export const getVehicleService = async (id: number): Promise<TSVehicles | undefined> => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.vehicle_id, id)
    })
}

export const createVehicleService = async (vehicle: TIVehicles): Promise<TIVehicles> => {
    await db.insert(vehiclesTable).values(vehicle)
    return vehicle;
}

export const updateVehicleService = async (id: number, vehicle: TIVehicles) => {
    await db.update(vehiclesTable).set(vehicle).where(eq(vehiclesTable.vehicle_id, id))
    return "vehicle updated successfully";
}

export const deleteVehicleService = async (id: number) => {
    await db.delete(vehiclesTable).where(eq(vehiclesTable.vehicle_id, id))
    return "vehicle deleted successfully";
}