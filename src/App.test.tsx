import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

vi.mock('./hooks/useGetUsers', () => ({
  useGetUsers: () => ({
    users: {
      red: ['User 1'],
      blue: ['User 2', 'User 3'],
    },
    isLoading: false,
  }),
}));

describe('App', () => {
  it('renders users by default', () => {
    render(<App />);

    expect(screen.getByText(/Login/)).toBeInTheDocument();
    expect(screen.getByText(/User 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Views/)).not.toBeInTheDocument();
  });

  it('renders views when a user is selected', () => {
    render(<App />);

    expect(screen.queryByText(/Views/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/User 1/))
    expect(screen.getByText(/Views/)).toBeInTheDocument();
  });
});