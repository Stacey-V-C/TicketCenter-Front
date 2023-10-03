import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Views } from './';
import { Area, PluginSummary, PluginType, View } from '../../types';

const giveContext = vi.fn();

const mockContext = {
  isLoading: false,
  refreshTickets: () => { },
  updatePlugins: () => { },
  views: [],
  userId: 'View 1'
}

vi.mock('../../hooks/useQueryContext', () => ({
  useQueryContext: () => giveContext()
}));

const mockPlugin = {
  plugin: { type: PluginType.BOLD_TEXT, word: 'hello' },
  state: {
    areas: [Area.FRONTEND, Area.BACKEND, Area.DATABASE, Area.INFRA],
    boldWords: ['hello'],
  }
} as PluginSummary;
const mockTicket = { id: 1, area: Area.FRONTEND, content: 'hello world' };

const emptyView = {
  name: 'View 1',
  plugins: [],
  latestState: {
    areas: [Area.FRONTEND, Area.BACKEND, Area.DATABASE, Area.INFRA],
    boldWords: [],
  },
  tickets: []
} as View;

const viewWithTicket = {
  ...emptyView,
  tickets: [mockTicket]
} as View;

const viewWithPlugin = {
  ...emptyView,
  plugins: [mockPlugin]
} as View;

describe('Views', () => {
  afterEach(() => {
    vi.resetAllMocks()
  });
  it('gives an error message when there are no plugins or tickets in a view', () => {
    giveContext.mockReturnValueOnce({
      ...mockContext,
      views: [emptyView]
    });

    render(<Views team={'red'} unselect={() => { }} />);

    expect(screen.getAllByText(/View 1/)[0]).toBeInTheDocument();
    expect(screen.getByText(/no plugins or tickets/)).toBeInTheDocument();
  });

  it('shows a ticket when there is one', () => {
    giveContext.mockReturnValueOnce({
      ...mockContext,
      views: [viewWithTicket]
    });

    render(<Views team='red' unselect={() => { }} />);

    expect(screen.getByText(/View 1/)).toBeInTheDocument();
    expect(screen.getByText(/Frontend/)).toBeInTheDocument();
    expect(screen.getByText(/hello world/)).toBeInTheDocument();

    expect(screen.queryByText(/no plugins or tickets/)).not.toBeInTheDocument();
  });

  it('allows editing plugins when there are some', () => {
    giveContext.mockReturnValueOnce({
      ...mockContext,
      views: [viewWithPlugin]
    });

    render(<Views team='red' unselect={() => { }} />);

    expect(screen.getByText(/View 1/)).toBeInTheDocument();
    expect(screen.getByText(/Edit Plugins/)).toBeInTheDocument();
    expect(screen.queryByText(/no plugins or tickets/)).not.toBeInTheDocument();
  })
});