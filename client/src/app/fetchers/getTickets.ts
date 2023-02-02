import { Ticket } from '@acme/shared-models';

export const getTickets = async () => {
  const response = await fetch('/api/tickets');
  const tickets = await response.json();
  return tickets as Ticket[];
};
