import { render, screen } from '@testing-library/react';
import { TestWrapper } from '../utils/test-wrapper';
import { ThemeSwitcher } from './ThemeSwitcher';
import userEvent from '@testing-library/user-event';

describe('Theme switcher component', () => {
  it('should default to light mode', () => {
    render(<ThemeSwitcher />, { wrapper: TestWrapper });

    expect(screen.getByTitle(/light-mode/i)).toBeInTheDocument();
  });

  it('should switch to dark mode on click', async () => {
    render(<ThemeSwitcher />, { wrapper: TestWrapper });

    await userEvent.click(screen.getByTitle(/light-mode/i));

    expect(screen.getByTitle(/dark-mode/i)).toBeInTheDocument();
  });
});
