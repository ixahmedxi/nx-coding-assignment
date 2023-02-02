import { Ticket } from '@acme/shared-models';

export const getTicket = async ({ id }: { id: string }) => {
  const response = await fetch(`/api/tickets/${id}`);
  const tickets = await response.json();
  return tickets as Ticket;
};
