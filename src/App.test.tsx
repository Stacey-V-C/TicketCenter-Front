import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

vi.mock('useGetUsers', () => ({
  users: {
    red: ['User 1'],
    blue: ['User 2'],
  },
  isLoading: false,
}));

describe('App', () => {
  it('renders users by default', () => {
    render(<App />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.queryByText('Views')).not.toBeInTheDocument();
  });

  it('renders views when a user is selected', () => {
    render(<App />);
    expect(screen.queryByText('Views')).not.toBeInTheDocument();

    screen.getByText('User 1').click();

    expect(screen.getByText('Views')).toBeInTheDocument();
  });
});