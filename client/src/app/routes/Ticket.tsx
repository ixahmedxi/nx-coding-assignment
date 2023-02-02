import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { TicketDetails } from '../components/TicketDetails';

export const Ticket = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <main className="max-w-2xl mx-auto">
      <Navbar />
      <TicketDetails id={id} />
    </main>
  );
};
