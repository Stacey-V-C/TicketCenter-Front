import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Views } from './';
import { Area, PluginSummary, PluginType, View } from '../../types';

const mockPlugin = {
  plugin: { type: PluginType.BOLD_TEXT, word: 'hello' },
  summary: {}
} as PluginSummary;
const mockTicket = { id: 1, area: Area.FRONTEND, content: 'hello world' };

const mockData = (data: View[]) => {
  vi.mock('useGetUserData', () => ({
    data,
    isLoading: false,
  }));
}

describe('Views', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('gives an error message when there are no plugins or view', () => {
    mockData([{
      name: 'View 1',
      plugins: [],
      tickets: []
    }]);

    render(<Views userId='1' />);

    expect(screen.getByText('View 1')).toBeInTheDocument();
    expect(screen.getByText('no plugins or tickets')).toBeInTheDocument();
  });

  it('shows a ticket when there is one', () => {
    mockData([{
      name: 'View 1',
      plugins: [],
      tickets: [mockTicket]
    }]);

    render(<Views userId='1' />);

    expect(screen.getByText(/View 1/)).toBeInTheDocument();
    expect(screen.getByText(/Frontend/)).toBeInTheDocument();
    expect(screen.getByText(/hello world/)).toBeInTheDocument();

    expect(screen.queryByText(/no plugins or tickets/)).not.toBeInTheDocument();
    expect(screen.queryByText(/plugins/)).not.toBeInTheDocument();
  });

  it('allows editing plugins when there are some', () => {
    mockData([{
      name: 'View 1',
      plugins: [mockPlugin],
      tickets: []
    }]);

    render(<Views userId='1' />);

    expect(screen.getByText(/View 1/)).toBeInTheDocument();
    expect(screen.getByText(/Edit plugins/)).toBeInTheDocument();
    expect(screen.queryByText(/no plugins or tickets/)).not.toBeInTheDocument();
  })
});