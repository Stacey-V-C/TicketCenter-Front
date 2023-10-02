import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Users } from '.';

const mockSetter = vi.fn();

const mockUsers = {
  red: ['User A'],
  blue: ['User B', 'User C'],
};

describe('Users page', () => {
  it('renders all user ids passed to the component', () => {
    render(<Users onSelect={mockSetter} users={mockUsers} />);

    expect(screen.queryAllByRole('button')).toHaveLength(3);
    expect(screen.getAllByText(/User A/)).toBeInTheDocument();
    expect(screen.getAllByText(/User B/)).toBeInTheDocument();
    expect(screen.getAllByText(/User C/)).toBeInTheDocument();
  });

  it('calls the onSelect function with the id of the select user', () => {
    render(<Users onSelect={mockSetter} users={mockUsers} />);

    screen.getByText(/User A/).click();

    expect(mockSetter).toHaveBeenCalledWith('User A');
  })
})