import { FunctionComponent } from "react";
import { Box } from "../../ds/Box";
import { Plugin, PluginType } from "../../types";
import { getAreaString } from "../../util";
import { Button } from "../../ds/Button";

type Props = {
  color: string;
  plugin: Plugin;
  onEdit: () => void;
  onRemove: () => void;
}

export const DisplayPlugin: FunctionComponent<Props> = ({ color, onEdit, onRemove, plugin }) => {
  const isBoldText = plugin.type === PluginType.BOLD_TEXT;

  const typeName = isBoldText
    ? 'Bold Text'
    : 'Filter Areas';

  const label = plugin.type === PluginType.BOLD_TEXT
    ? "Word"
    : "Areas";
  const value = plugin.type === PluginType.BOLD_TEXT
    ? plugin.word
    : plugin.keptAreas?.map(getAreaString).join(', ') || '';
  return (
    <Box color={color}>
      <h3 className="text-md font-bold">{typeName}</h3>
      <p className="text-sm"><p className="font-bold">{label}:</p> {value}</p>
      <div className="flex justify-end">
        <Button color="green" onClick={onEdit}>Edit</Button>
        <Button color="darkRed" onClick={onRemove}>Remove</Button>
      </div>
    </Box>
  )
};