import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddTicket } from './AddTicket';
import { TestWrapper } from '../utils/test-wrapper';

describe('AddTicket component', () => {
  it('opens the dialog when trigger is clicked', async () => {
    render(<AddTicket />, { wrapper: TestWrapper });

    const button = screen.getByRole('button', { name: /create ticket/i });

    await userEvent.click(button);

    expect(
      screen.getByText(/add a new ticket description/i)
    ).toBeInTheDocument();
  });

  it('closes the dialog when cancel button is clicked', async () => {
    render(<AddTicket />, { wrapper: TestWrapper });

    const button = screen.getByRole('button', { name: /create ticket/i });

    await userEvent.click(button);

    const closeButton = screen.getByTitle(/close-dialog/i);

    await userEvent.click(closeButton);

    expect(
      screen.queryByText(/add a new ticket description/i)
    ).not.toBeInTheDocument();
  });
});
