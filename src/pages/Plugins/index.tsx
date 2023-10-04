import { FunctionComponent, useState } from 'react';

import { Box } from '../../ds/Box';
import type { Plugin, PluginSummary } from '../../types';
import { useQueryContext } from '../../hooks/useQueryContext';
import { Button } from '../../ds/Button';
import { DisplayPlugin } from './DisplayPlugin';
import { EditPlugin } from './EditPlugin';

type Props = {
  onClose: () => void;
  latestState: PluginSummary['state'];
  name: string;
  plugins: PluginSummary[];
  team?: 'red' | 'blue';
}

export type EmptyPlugin = {
  plugin: null;
  state: PluginSummary['state'];
}

type EditingPluginState = {
  plugin: PluginSummary | EmptyPlugin;
  index: number;
}

export const Plugins: FunctionComponent<Props> = ({
  onClose,
  latestState,
  name,
  plugins,
  team = 'red'
}) => {
  const [editingPlugin, setEditingPlugin] = useState<EditingPluginState | null>(null);
  const { updatePlugins } = useQueryContext();

  const colorByTeam = team === 'red' ? 'red' : 'skyBlue';
  const oppositeTeam = team === 'red' ? 'skyBlue' : 'red';

  const isTeamSettings = name === 'Team';

  console.log('isTeamSettings', isTeamSettings)

  const handleRemove = (i: number) => {
    const newPlugins = plugins
      .slice(0, i).concat(plugins.slice(i + 1))
      .map(({ plugin }) => plugin);

    updatePlugins({
      plugins: newPlugins,
      isTeamSettings,
    });
  }

  const handleSubmit = (plugin: Plugin, i: number) => {
    const newPlugins = plugins.map(({ plugin }) => plugin);
    newPlugins[i] = plugin;

    updatePlugins({
      plugins: newPlugins,
      isTeamSettings,
    }, {
      onSuccess: () => setEditingPlugin(null),
    });
  }

  return (
    <div className="max-w-sm">
      <h2 className="text-lg font-bold mb-2">{`${name}: Plugins`}</h2>
      {editingPlugin ? (
        <EditPlugin
          pluginSummary={editingPlugin.plugin}
          index={editingPlugin.index}
          onCancel={() => setEditingPlugin(null)}
          onSubmit={handleSubmit} />
      ) : (
        <Box color="black">
          <Button color="grey" onClick={onClose}>Back</Button>
          {plugins.map((p, i) => (
            <DisplayPlugin
              key={i}
              color={i % 2 === 0 ? colorByTeam : oppositeTeam}
              plugin={p.plugin}
              onEdit={() => setEditingPlugin({ plugin: p, index: i })}
              onRemove={() => handleRemove(i)}
            />
          ))}
          <Button
            color="green"
            onClick={() => setEditingPlugin({
              plugin: { plugin: null, state: latestState },
              index: plugins.length,
            })}
          >
            New
          </Button>
        </Box>
      )}
    </div>
  )
}
