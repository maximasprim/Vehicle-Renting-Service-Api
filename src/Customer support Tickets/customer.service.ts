import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TICustomerSupportTickets,TSCustomerSupportTickets,customerSupportTicketsTable } from "../drizzle/schema";



export const ticketService = async ():Promise<TSCustomerSupportTickets[] | null> =>{
    return await db.query.customerSupportTicketsTable.findMany();

}

export const getTicketService = async (id: number): Promise<TSCustomerSupportTickets | undefined> => {
    return await db.query.customerSupportTicketsTable.findFirst({
        where: eq(customerSupportTicketsTable.ticket_id, id)
    })
}

export const createTicketService = async (ticket: TICustomerSupportTickets): Promise<TICustomerSupportTickets> => {
    await db.insert(customerSupportTicketsTable).values(ticket)
    return ticket;
}

export const updateTicketService = async (id: number, ticket: TICustomerSupportTickets) => {
    await db.update(customerSupportTicketsTable).set(ticket).where(eq(customerSupportTicketsTable.ticket_id, id))
    return ticket;
}

export const deleteTicketService = async (id: number) => {
    await db.delete(customerSupportTicketsTable).where(eq(customerSupportTicketsTable.ticket_id, id))
    return "Ticket deleted successfully";
}