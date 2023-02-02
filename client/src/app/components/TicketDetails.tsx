import { Ticket, User } from '@acme/shared-models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTicket } from '../fetchers/getTicket';
import { getUser } from '../fetchers/getUser';
import { getUsers } from '../fetchers/getUsers';
import { updateTicket } from '../fetchers/updateTicket';

type TicketDetailsProps = {
  id: string;
};

type TicketDataProps = {
  data: Ticket;
  user: User;
  users: User[];
};

const TicketData = ({ data, user, users }: TicketDataProps) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [ticketDescription, setTicketDescription] = useState(data.description);
  const [ticketAssignee, setTicketAssignee] = useState(String(user.id));

  const { mutate } = useMutation({
    mutationKey: ['updateTicket'],
    mutationFn: updateTicket,
    onSuccess() {
      client.invalidateQueries(['tickets']);
      navigate('/');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          ticketId: String(data.id),
          description: ticketDescription,
          userId: ticketAssignee,
        });
      }}
    >
      <label
        htmlFor="description"
        className="text-sm dark:text-zinc-400 text-zinc-600 pb-2 inline-block"
      >
        Description
      </label>
      <input
        id="description"
        type="text"
        value={ticketDescription}
        onChange={(e) => setTicketDescription(e.target.value)}
        className="px-4 py-2 w-full border-2 dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-zinc-100 rounded-md mb-4"
      />
      <label
        htmlFor="assignee"
        className="text-sm dark:text-zinc-400 text-zinc-600 pb-2 inline-block"
      >
        Assignee
      </label>
      <select
        id="assignee"
        className="px-4 py-2 w-full border-2 dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-zinc-100 rounded-md"
        value={ticketAssignee}
        onChange={(e) => setTicketAssignee(e.target.value)}
      >
        <option value={user.id}>{user.name}</option>
        {users
          .filter((u) => u.id !== user.id)
          .map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
      </select>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-teal-500 px-4 py-2 rounded-md text-black mt-4"
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export const TicketDetails: FC<TicketDetailsProps> = ({ id }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tickets', id],
    queryFn: () => getTicket({ id }),
  });

  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({
    queryKey: ['users', data?.assigneeId],
    queryFn: () => getUser(data?.assigneeId),
  });

  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading || userIsLoading || usersIsLoading)
    return <div>Loading...</div>;

  if (isError || userIsError || usersIsError)
    return <div>Something went wrong</div>;

  return (
    <div>
      <TicketData data={data} user={user} users={users} />
    </div>
  );
};
