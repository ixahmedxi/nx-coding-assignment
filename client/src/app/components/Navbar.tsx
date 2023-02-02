import { Link } from 'react-router-dom';
import { AddTicket } from './AddTicket';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = () => {
  return (
    <nav className="flex justify-between py-8 items-center">
      <Link to="/" className="text-2xl font-bold">
        Ticketo
      </Link>
      <ul className="flex items-center gap-3">
        <li>
          <AddTicket />
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
