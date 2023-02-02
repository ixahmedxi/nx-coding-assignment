type UpdateTicketParams = {
  ticketId: string;
  description: string;
  userId: string;
};

export const updateTicket = async ({
  ticketId,
  description,
  userId,
}: UpdateTicketParams) => {
  const response = await fetch(
    `/api/tickets/${ticketId}/update/${description}/${userId}`,
    {
      method: 'PUT',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update ticket');
  }

  return response.json();
};
