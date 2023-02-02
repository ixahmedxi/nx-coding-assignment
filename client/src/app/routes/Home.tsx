import { Navbar } from '../components/Navbar';
import { Tickets } from '../components/Tickets';

export const Home = () => {
  return (
    <main className="max-w-2xl mx-auto">
      <Navbar />
      <Tickets />
    </main>
  );
};
