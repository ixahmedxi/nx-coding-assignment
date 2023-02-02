import { Ticket } from '@acme/shared-models';

export const createTicket = async ({
  description,
  assigneeId,
}: {
  description: string;
  assigneeId: number;
}) => {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description, assigneeId }),
  });
  return response.json() as Promise<Ticket>;
};
