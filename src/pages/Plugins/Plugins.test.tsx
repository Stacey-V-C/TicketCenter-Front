import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Plugins } from '.';
import { Area, PluginSummary, PluginType } from '../../types';

const spyUpdate = vi.fn();

vi.mock('../../hooks/useQueryContext', () => ({
  useQueryContext: () => ({
    isLoading: false,
    refreshTickets: () => { },
    updatePlugins: spyUpdate,
    views: [],
  })
}));

const allAreas = [Area.FRONTEND, Area.BACKEND, Area.DATABASE, Area.INFRA];

const mockPlugins: PluginSummary[] = [
  {
    plugin: {
      type: PluginType.BOLD_TEXT,
      word: 'example',
    },
    state: {
      areas: allAreas,
      boldWords: ['false'],
    }
  },
  {
    plugin: {
      type: PluginType.FILTER_AREAS,
      keptAreas: [Area.FRONTEND],
    },
    state: {
      areas: allAreas,
      boldWords: ['false', 'example'],
    }
  }
];

const mockLatestState = {
  areas: allAreas,
  boldWords: ['false', 'example'],
}

describe('Plugins Page Test', () => {
  it('renders all plugins', () => {

    render(
      <Plugins
        plugins={mockPlugins}
        isTeamSettings={false}
        latestState={mockLatestState}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryAllByRole('button')).toHaveLength(6);
    expect(screen.getAllByText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByText(/Remove/)).toHaveLength(2);
    expect(screen.getAllByText(/New/)).toHaveLength(1);
    expect(screen.getByText(/Back/)).toBeInTheDocument();
    expect(screen.getByText(/Bold Text/)).toBeInTheDocument();
    expect(screen.getByText(/Filter Areas/)).toBeInTheDocument();
    expect(screen.getByText(/example/)).toBeInTheDocument();
    expect(screen.getByText(/Frontend/)).toBeInTheDocument();
  });

  it('opens a plugin page with editing details when you click edit', () => {
    render(
      <Plugins
        plugins={mockPlugins}
        isTeamSettings={false}
        latestState={mockLatestState}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByText(/Editing Plugin/)).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText(/Edit/)[0]);
    expect(screen.getByText(/Editing Plugin/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
    expect(screen.queryByTestId('area-0-checkbox')).not.toBeInTheDocument();
    expect(screen.getByTestId('plugin-type-menu')).toBeInTheDocument();
    expect(screen.getByTestId('plugin-type-menu')).toHaveValue('b')
    expect(screen.getByTestId('bold-word-input')).toBeInTheDocument();
    expect(screen.getByTestId('bold-word-input')).toHaveValue('example');
  });

  it('opens a variation on the plugin page when editing a filter areas plugin', () => {
    render(
      <Plugins
        plugins={mockPlugins}
        isTeamSettings={false}
        latestState={mockLatestState}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByText(/Editing Plugin/)).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText(/Edit/)[1]);
    expect(screen.getByText(/Editing Plugin/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    expect(screen.getByTestId('plugin-type-menu')).toBeInTheDocument();
    expect(screen.getByTestId('plugin-type-menu')).toHaveValue('f')
    expect(screen.queryByTestId('bold-word-input')).not.toBeInTheDocument();
  });

  it('calls updatePlugins when you click save', () => {
    render(
      <Plugins
        plugins={mockPlugins}
        isTeamSettings={false}
        latestState={mockLatestState}
        onClose={vi.fn()}
      />
    );

    fireEvent.click(screen.getAllByText(/Edit/)[0]);
    fireEvent.change(screen.getByTestId('bold-word-input'), { target: { value: 'new example' } });
    screen.getByRole('button', { name: /Save/ }).click();

    const expectedPlugins = [
      {
        ...mockPlugins[0].plugin,
        word: 'new example',
      },
      mockPlugins[1].plugin,
    ]

    expect(spyUpdate).toHaveBeenCalledWith(
      {
        plugins: expectedPlugins,
        isTeamSettings: false,
      },
      expect.any(Object)
    );
  });

  it('opens a blank screen for a new plugin when you click new', () => {
    render(
      <Plugins
        plugins={mockPlugins}
        isTeamSettings={false}
        latestState={mockLatestState}
        onClose={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText(/New/))
    expect(screen.getByText(/Editing Plugin/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
    expect(screen.queryByTestId('area-0-checkbox')).not.toBeInTheDocument();
    expect(screen.getByTestId('plugin-type-menu')).toBeInTheDocument();
    expect(screen.getByTestId('plugin-type-menu')).toHaveTextContent(/Select a plugin type/);
    expect(screen.queryByTestId('bold-word-input')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('plugin-type-menu'));
    expect(screen.getByText(/Bold Text/)).toBeVisible();
    expect(screen.getByText(/Filter Areas/)).toBeVisible();
    fireEvent.change(screen.getByTestId('plugin-type-menu'), { target: { value: 'b' } });
    expect(screen.queryByTestId('area-0-checkbox')).not.toBeInTheDocument();
    expect(screen.getByTestId('bold-word-input')).toBeInTheDocument();
    expect(screen.getByTestId('bold-word-input')).toHaveValue('');

    fireEvent.change(screen.getByTestId('bold-word-input'), { target: { value: 'new example' } });

    fireEvent.click(screen.getByText(/Save/));

    const expectedPlugins = [
      ...mockPlugins.map(({ plugin }) => plugin),
      {
        type: PluginType.BOLD_TEXT,
        word: 'new example',
      }
    ]

    expect(spyUpdate).toHaveBeenCalledWith({
      plugins: expectedPlugins,
      isTeamSettings: false,
    },
      expect.any(Object));
  })
});