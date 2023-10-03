import { FunctionComponent, useState } from "react";

import { Box } from "../../ds/Box";
import { Button } from "../../ds/Button";
import { Area, Plugin, PluginSummary, PluginType } from "../../types";
import type { EmptyPlugin } from ".";
import { getAreaString } from "../../util";

type Props = {
  pluginSummary: PluginSummary | EmptyPlugin;
  onSubmit: (plugin: Plugin, i: number) => void;
  onCancel: () => void;
  index: number;
}

const getTypeString = (type?: PluginType) => {
  switch (type) {
    case PluginType.BOLD_TEXT:
      return "b";
    case PluginType.FILTER_AREAS:
      return "f";
    default:
      return "";
  }
}

const getTypeFromString = (type: string) => {
  switch (type) {
    case "b":
      return PluginType.BOLD_TEXT;
    case "f":
      return PluginType.FILTER_AREAS;
    default:
      return null;
  }
}

export const EditPlugin: FunctionComponent<Props> = ({ index, pluginSummary, onSubmit, onCancel }) => {
  const [pluginType, setPluginType] = useState<string>(
    getTypeString(pluginSummary?.plugin?.type) || ''
  );
  // @ts-expect-error we need to fix the check here
  const [word, setWord] = useState<string | null>(pluginSummary?.plugin?.word || null);
  // @ts-expect-error we need to fix the check here
  const [keptAreas, setKeptAreas] = useState<Area[]>(pluginSummary?.plugin?.keptAreas || []);

  const isIncomplete = pluginType === null ||
    (getTypeFromString(pluginType) === PluginType.BOLD_TEXT && word === null) ||
    (getTypeFromString(pluginType) === PluginType.FILTER_AREAS && keptAreas.length === 0);

  const handleSubmit = () => {
    const type = getTypeFromString(pluginType);
    const plugin = getTypeFromString(pluginType) === PluginType.BOLD_TEXT
      ? { type, word }
      : { type, keptAreas };

    // @ts-expect-error we need to fix the check here
    onSubmit(plugin, index);
  }

  return (
    <Box color="black">
      <h2 className="text-lg font-bold">Editing Plugin</h2>
      <p className="text-sm font-bold">Plugin Type:</p>
      <select
        data-testid="plugin-type-menu"
        className="ml-2 p-1 border-2 border-black"
        value={pluginType || undefined}
        onChange={(e) => {
          setPluginType(e.target.value)
        }}
      >
        <option value="">Select a plugin type</option>
        <option value={getTypeString(PluginType.BOLD_TEXT)}>Bold Text</option>
        <option value={getTypeString(PluginType.FILTER_AREAS)}>Filter Areas</option>
      </select>
      {pluginType === 'b' ? (
        <div>
          <p className="text-sm font-bold">Word:</p>
          <input
            type="text"
            data-testid="bold-word-input"
            className="ml-2 p-1 border-2 border-black"
            placeholder="Enter a word"
            value={word || ''}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
      ) : null}
      {pluginType === 'f' ? (
        <div>
          <p className="text-sm font-bold">Areas:</p>
          {pluginSummary?.state?.areas?.map((area: Area, i: number) => (
            <div key={area}>
              <input
                data-testid={`area-${i}-checkbox`}
                type="checkbox"
                className="ml-2 p-1 border-2 border-black"
                checked={keptAreas.includes(area)}
                onChange={(e) => {
                  const newKeptAreas = e.target.checked
                    ? keptAreas.concat(area)
                    : keptAreas.filter((a) => a !== area);
                  setKeptAreas(newKeptAreas);
                }}
              />
              <span className="ml-2">{getAreaString(area)}</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex justify-end">
        <Button color="green" disabled={isIncomplete} onClick={handleSubmit}>Save</Button>
        <Button color="grey" onClick={onCancel}>Cancel</Button>
      </div>
    </Box>
  )
};