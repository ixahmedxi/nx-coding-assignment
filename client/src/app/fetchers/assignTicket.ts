export const assignTicket = async ({
  ticketId,
  userId,
}: {
  ticketId: number;
  userId: number;
}) => {
  const response = await fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
    method: 'PUT',
  });
  return response.json() as Promise<void>;
};
