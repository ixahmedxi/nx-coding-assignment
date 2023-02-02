import { Ticket } from '@acme/shared-models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../fetchers/createTicket';
import { getUsers } from '../fetchers/getUsers';
import { Dialog } from './Dialog';

export const AddTicket = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['addTicket'],
    mutationFn: createTicket,
    onSuccess: (data) => {
      client.setQueryData(['tickets'], (oldData?: Ticket[]) => {
        if (!oldData) {
          return;
        }
        return [...oldData, data];
      });
    },
  });

  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketAssignee, setTicketAssignee] = useState('');

  const onSubmit = () => {
    mutateAsync({
      description: ticketDescription,
      assigneeId: Number(ticketAssignee),
    }).then(() => navigate('/'));
  };

  return (
    <Dialog
      trigger={
        <button className="bg-teal-500 text-black px-4 py-2 rounded-lg flex items-center gap-3">
          Create ticket
        </button>
      }
      title="Create ticket"
      description="Add a new ticket description, assign a user and specify the status of the ticket then press on the add ticket button."
      submitButtonOnClick={onSubmit}
    >
      <form>
        <input
          type="text"
          placeholder="Ticket description"
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)}
          className="w-full border-2 border-zinc-200 dark:border-zinc-700 rounded-lg py-2 px-4 mt-4 dark:bg-zinc-800 bg-zinc-100 outline-none focus-visible:border-teal-500 dark:focus-visible:border-teal-500 transition-colors placeholder:text-zinc-500"
        />
        {users && (
          <select
            value={ticketAssignee}
            onChange={(e) => setTicketAssignee(e.target.value)}
            className="w-full my-4 p-2 rounded-md dark:bg-zinc-800 bg-zinc-100 border-2 dark:border-zinc-700 border-zinc-200 outline-none focus-visible:border-teal-500 dark:focus-visible:border-teal-500 transition-colors"
          >
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        )}
      </form>
    </Dialog>
  );
};
