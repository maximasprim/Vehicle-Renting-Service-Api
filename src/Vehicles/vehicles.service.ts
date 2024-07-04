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

export const getVehicleWithVehicle_SpecificationsService = async (): Promise<
  TSVehicles[] | null
> => {
  return await db.query.vehiclesTable.findMany({
    with: {
      vehicleSpecification: {
        columns: {
          vehicleSpec_id: true,
          vehicle_id: true,
          manufacturer: true,
          model: true,
          year: true,
          fuel_type: true,
          engine_capacity: true,
        transmission: true,
        seating_capacity: true,
        color: true,
        features: true
        },

      },
    },
  });
};
export const getVehicleWithVehicleSpecsAndFleetManagementService = async (): Promise<
  TSVehicles[] | null
> => {
  return await db.query.vehiclesTable.findMany({
    with: {
      vehicleSpecification: {
        columns: {
          vehicleSpec_id: true,
          vehicle_id: true,
          manufacturer: true,
          model: true,
          year: true,
          fuel_type: true,
          engine_capacity: true,
          transmission: true,
          seating_capacity: true,
          color: true,
          features: true,
        },

        with: {
          fleetManagements: {
            columns: {
              fleet_id: true,
              vehicle_id: true,
              acquisition_date: true,
              depreciation_rate: true,
              current_value: true,
              maintenance_cost: true,
              status: true,
            },
          },
        },
      },
      
    },
  });
};
