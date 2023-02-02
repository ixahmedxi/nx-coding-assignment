import { Ticket } from '@acme/shared-models';

export const toggleComplete = async ({ id }: { id: number }) => {
  const response = await fetch(`/api/tickets/${id}/togglecomplete`, {
    method: 'PUT',
  });
  return response.json() as Promise<Ticket>;
};
