import { Ticket, User } from '@acme/shared-models';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FiCheck, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getTickets } from '../fetchers/getTickets';
import { getUser } from '../fetchers/getUser';
import { getUsers } from '../fetchers/getUsers';
import { toggleComplete } from '../fetchers/toggleComplete';

const TicketItem = ({ ticket, user }: { ticket: Ticket; user?: User }) => {
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['toggleComplete'],
    mutationFn: toggleComplete,
    onMutate: async ({ id }) => {
      await client.cancelQueries({ queryKey: ['tickets'] });

      const previousTickets = client.getQueryData<Ticket[]>(['tickets']);

      client.setQueryData<Ticket[]>(['tickets'], (old) => {
        return old?.map((t) => {
          if (t.id === id) {
            return { ...t, completed: !t.completed };
          }
          return t;
        });
      });

      return { previousTickets };
    },
    onError: (_, __, context) => {
      client.setQueryData(['todos'], context?.previousTickets);
    },
    onSettled: () => {
      client.invalidateQueries(['tickets']);
    },
  });

  return (
    <li className="w-full dark:bg-zinc-800 bg-zinc-100 border-2 pl-4 dark:border-zinc-700 border-zinc-200 rounded-md transition-colors dark:hover:bg-zinc-700 dark:hover:border-zinc-600 hover:bg-zinc-200 hover:border-zinc-300 flex items-center justify-between">
      <button
        type="button"
        className="flex-1"
        onClick={() => mutate({ id: ticket.id })}
        key={ticket.id}
      >
        <div className="flex items-center gap-3">
          {ticket.completed && <FiCheck className="text-teal-500" />}
          <h1>{ticket.description}</h1>
        </div>
      </button>
      <div className="flex items-center gap-3">
        {user?.name && (
          <span className="bg-teal-500 rounded-full px-3 py-1 text-sm text-black">
            {user.name}
          </span>
        )}
        <Link to={`/${ticket.id}`} className="pr-4 py-3">
          <FiChevronRight />
        </Link>
      </div>
    </li>
  );
};

export const Tickets = () => {
  const [filterValue, setFilterValue] = useState('all');
  const {
    data: tickets,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
  } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  const [filteredTickets, setFilteredTickets] = useState<Ticket[] | undefined>(
    tickets
  );

  const {
    data: allUsers,
    isLoading: isAllUsersLoading,
    isError: isAllUsersError,
  } = useQuery({
    queryKey: ['allUsers'],
    queryFn: getUsers,
  });

  const users = useQueries({
    queries:
      tickets?.map((ticket) => ({
        queryKey: ['users', ticket.assigneeId],
        queryFn: () => getUser(Number(ticket.assigneeId)),
        staleTime: Infinity,
      })) || [],
  });

  useEffect(() => {
    if (filterValue === 'all') {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets?.filter((ticket) => String(ticket.assigneeId) === filterValue)
      );
    }
  }, [filterValue, tickets]);

  if (isTicketsLoading || isAllUsersLoading) return <div>Loading...</div>;

  if (isTicketsError || isAllUsersError)
    return <div>Something went wrong...</div>;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <select
            name="Filter"
            id="filter"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="all">All</option>
            {allUsers?.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <ul className="flex flex-col gap-3">
          {filteredTickets &&
            filteredTickets
              .filter((ticket) => !ticket.completed)
              .map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  ticket={ticket}
                  user={
                    users.find((u) => u.data?.id === ticket.assigneeId)
                      ?.data as User
                  }
                />
              ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold pb-3">Completed tasks</h2>
        <ul className="flex flex-col gap-3">
          {filteredTickets &&
            filteredTickets
              .filter((ticket) => ticket.completed)
              .map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  ticket={ticket}
                  user={
                    users.find((u) => u.data?.id === ticket.assigneeId)?.data
                  }
                />
              ))}
        </ul>
      </div>
    </div>
  );
};
