import { render, screen } from '@testing-library/react';
import { Dialog } from './Dialog';
import userEvent from '@testing-library/user-event';
import { TestWrapper } from '../utils/test-wrapper';

describe('Dialog component', () => {
  it('should render the trigger button', () => {
    render(
      <Dialog
        trigger={<button>trigger button</button>}
        title="Dialog title"
        description="Dialog description"
      />
    );

    expect(
      screen.getByRole('button', { name: /trigger button/i })
    ).toBeInTheDocument();
  });

  it('should open the dialog when trigger is pressed', async () => {
    render(
      <Dialog
        trigger={<button>trigger button</button>}
        title="Dialog title"
        description="Dialog description"
      />,
      { wrapper: TestWrapper }
    );

    const trigger = screen.getByRole('button', { name: /trigger button/i });

    await userEvent.click(trigger);

    expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
    expect(screen.getByText(/dialog description/i)).toBeInTheDocument();
  });

  it('should close the dialog when the close button is pressed', async () => {
    render(
      <Dialog
        trigger={<button>trigger button</button>}
        title="Dialog title"
        description="Dialog description"
      />,
      { wrapper: TestWrapper }
    );

    const trigger = screen.getByRole('button', { name: /trigger button/i });

    await userEvent.click(trigger);

    expect(screen.getByText(/dialog title/i)).toBeInTheDocument();

    const closeButton = screen.getByTitle(/close-dialog/i);

    await userEvent.click(closeButton);

    expect(screen.queryByText(/dialog title/i)).not.toBeInTheDocument();
  });

  it('should render the children inside the dialog', async () => {
    render(
      <Dialog
        trigger={<button>trigger button</button>}
        title="Dialog title"
        description="Dialog description"
      >
        Dialog content here
      </Dialog>,
      { wrapper: TestWrapper }
    );

    const trigger = screen.getByRole('button', { name: /trigger button/i });

    await userEvent.click(trigger);

    expect(screen.getByText(/dialog content here/i)).toBeInTheDocument();
  });
});
