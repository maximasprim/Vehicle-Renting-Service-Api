import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIFleetManagement,TSFleetManagement,fleetManagementTable } from "../drizzle/schema";



export const fleetService = async ():Promise<TSFleetManagement[] | null> =>{
    return await db.query.fleetManagementTable.findMany();

}

export const getFleetManagementService = async (id: number): Promise<TSFleetManagement | undefined> => {
    return await db.query.fleetManagementTable.findFirst({
        where: eq(fleetManagementTable.fleet_id, id)
    })
}

export const createFleetManagementService = async (fleet: TIFleetManagement): Promise<TIFleetManagement> => {
    await db.insert(fleetManagementTable).values(fleet)
    return fleet;
}

export const updateFleetManagementService = async (id: number, fleet: TIFleetManagement) => {
    await db.update(fleetManagementTable).set(fleet).where(eq(fleetManagementTable.fleet_id, id))
    return fleet;
}

export const deleteFleetManagementService = async (id: number) => {
    await db.delete(fleetManagementTable).where(eq(fleetManagementTable.fleet_id, id))
    return "FleetManagement deleted successfully";
}