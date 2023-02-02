import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { TestWrapper } from '../utils/test-wrapper';

describe('Navbar component', () => {
  it('renders the logo with link', () => {
    render(<Navbar />, { wrapper: TestWrapper });

    const logo = screen.getByRole('link', { name: /ticketo/i });
    expect(logo).toBeInTheDocument();
  });

  it('renders the create ticket button', () => {
    render(<Navbar />, { wrapper: TestWrapper });

    const button = screen.getByRole('button', { name: /create ticket/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the theme switcher button', () => {
    render(<Navbar />, { wrapper: TestWrapper });

    const button = screen.getByTitle(/light-mode/i);
    expect(button).toBeInTheDocument();
  });
});
