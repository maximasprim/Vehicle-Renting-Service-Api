import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";



// Users Table
export const roleEnum = pgEnum("role", ["user", "admin","both"]);
export const usersTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  full_name: varchar("full_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique(),
  contact_phone: varchar("contact_phone", { length: 20 }),
  address: varchar("address", { length: 256 }),
  role: roleEnum("role").default("user"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Vehicles Table
export const vehiclesTable = pgTable("vehicles", {
  vehicle_id: serial("vehicle_id").primaryKey(),
  // vehicleSpec_id: integer("vehicleSpec_id").references(() => vehicleSpecificationsTable.vehicleSpec_id),
  rental_rate: varchar("rental_rate", { length: 10 }).notNull(),
  availability: boolean("availability").default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Vehicle Specifications Table
export const vehicleSpecificationsTable = pgTable("vehicle_specifications", {
  vehicleSpec_id: serial("vehicleSpec_id").primaryKey(),
  vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id,{ onDelete: "cascade"}),
  manufacturer: varchar("manufacturer", { length: 256 }).notNull(),
  model: varchar("model", { length: 256 }).notNull(),
  year: integer("year").notNull(),
  fuel_type: varchar("fuel_type", { length: 256 }).notNull(),
  engine_capacity: varchar("engine_capacity", { length: 256 }).notNull(),
  transmission: varchar("transmission", { length: 256 }).notNull(),
  seating_capacity: integer("seating_capacity").notNull(),
  color: varchar("color", { length: 256 }),
  features: varchar("features", { length: 256 }),
});

// Bookings Table
export const bookingsTable = pgTable("bookings", {
  booking_id: serial("booking_id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.user_id),
  vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id,{ onDelete: "cascade"}),
  location_id: integer("location_id").references(() => locationsTable.location_id,{ onDelete: "cascade"}),
  booking_date: varchar("booking_date", { length: 50 }).notNull(),
  return_date: varchar("return_date", { length: 50 }).notNull(),
  total_amount: varchar("total_amount", { length: 10 }).notNull(),
  booking_status: varchar("booking_status", { length: 256 }).default("Pending"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Payments Table
export const paymentsTable = pgTable("payments", {
  payment_id: serial("payment_id").primaryKey(),
  booking_id: integer("booking_id").references(() => bookingsTable.booking_id,{ onDelete: "cascade"}),
  amount: integer("amount").notNull(),
  payment_status: varchar("payment_status", { length: 256 }).default("Pending"),
  payment_date: varchar("payment_date", { length: 50 }),
  payment_method: varchar("payment_method", { length: 256 }),
  transaction_id: varchar("transaction_id", { length: 256 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Authentication Table
export const authenticationTable = pgTable("authentication", {
  auth_id: serial("auth_id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.user_id,{ onDelete: "cascade"}),
  username: varchar("username", { length: 256 }).notNull(),
  role: roleEnum("role").default("user"),
  password: varchar("password", { length: 256 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Customer Support Tickets Table
export const customerSupportTicketsTable = pgTable("customer_support_tickets", {
  ticket_id: serial("ticket_id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.user_id,{ onDelete: "cascade"}),
  subject: varchar("subject", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  status: varchar("status", { length: 256 }).default("Open"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Locations Table
export const locationsTable = pgTable("locations", {
  location_id: serial("location_id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 20 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Fleet Management Table
export const fleetManagementTable = pgTable("fleet_management", {
  fleet_id: serial("fleet_id").primaryKey(),
  vehicle_id: integer("vehicle_id").references(() => vehiclesTable.vehicle_id,{ onDelete: "cascade"}),
  acquisition_date: varchar("acquisition_date", { length: 50 }).notNull(),
  depreciation_rate: varchar("depreciation_rate", { length: 256 }).notNull(),
  current_value: varchar("current_value", { length: 256 }).notNull(),
  maintenance_cost: varchar("maintenance_cost", { length: 256 }),
  status: varchar("status", { length: 256 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const userRelations = relations(usersTable, ({ many }) => ({
  bookings: many(bookingsTable),
  supportTickets: many(customerSupportTicketsTable),
  authentications: many(authenticationTable),
}));

export const vehicleSpecificationsRelations = relations(vehicleSpecificationsTable, ({ many }) => ({
  vehicles: many(vehiclesTable),
  bookings: many(bookingsTable),
  fleetManagements: many(fleetManagementTable),
}));

export const vehiclesRelations = relations(vehiclesTable, ({ one }) => ({
  vehicleSpecification: one(vehicleSpecificationsTable, {
    fields: [vehiclesTable.vehicle_id],
    references: [vehicleSpecificationsTable.vehicle_id],
  }),
}));

export const bookingsRelations = relations(bookingsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [bookingsTable.user_id],
    references: [usersTable.user_id],
  }),
  vehicle: one(vehiclesTable, {
    fields: [bookingsTable.vehicle_id],
    references: [vehiclesTable.vehicle_id],
  }),
  location: one(locationsTable, {
    fields: [bookingsTable.location_id],
    references: [locationsTable.location_id],
  }),
  payments: many(paymentsTable),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  booking: one(bookingsTable, {
    fields: [paymentsTable.booking_id],
    references: [bookingsTable.booking_id],
  }),
}));

export const authenticationRelations = relations(authenticationTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [authenticationTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export const customerSupportTicketsRelations = relations(customerSupportTicketsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [customerSupportTicketsTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export const fleetManagementRelations = relations(fleetManagementTable, ({ one }) => ({
  vehicleSpecification: one(vehicleSpecificationsTable, {
    fields: [fleetManagementTable.vehicle_id],
    references: [vehicleSpecificationsTable.vehicle_id],
  }),
}));

export const locationsRelations = relations(locationsTable, ({ many }) => ({
  bookings: many(bookingsTable),
}));

// Type Definitions
export type TIUsers = typeof usersTable.$inferInsert;
export type TSUsers = typeof usersTable.$inferSelect;

export type TIVehicleSpecifications = typeof vehicleSpecificationsTable.$inferInsert;
export type TSVehicleSpecifications = typeof vehicleSpecificationsTable.$inferSelect;

export type TIVehicles = typeof vehiclesTable.$inferInsert;
export type TSVehicles = typeof vehiclesTable.$inferSelect;

export type TIBookings = typeof bookingsTable.$inferInsert;
export type TSBookings = typeof bookingsTable.$inferSelect;

export type TIPayments = typeof paymentsTable.$inferInsert;
export type TSPayments = typeof paymentsTable.$inferSelect;

export type TIAuthentication = typeof authenticationTable.$inferInsert;
export type TSAuthentication = typeof authenticationTable.$inferSelect;

export type TICustomerSupportTickets = typeof customerSupportTicketsTable.$inferInsert;
export type TSCustomerSupportTickets = typeof customerSupportTicketsTable.$inferSelect;

export type TILocations = typeof locationsTable.$inferInsert;
export type TSLocations = typeof locationsTable.$inferSelect;

export type TIFleetManagement = typeof fleetManagementTable.$inferInsert;
export type TSFleetManagement = typeof fleetManagementTable.$inferSelect;
