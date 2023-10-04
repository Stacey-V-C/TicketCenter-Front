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

  const label = isBoldText ? "Word" : "Areas";

  const value = isBoldText
    ? plugin.word
    : plugin.keptAreas?.map(getAreaString).join(', ') || '';

  return (
    <Box color={color}>
      <h3 className="text-md font-bold">{typeName}</h3>
      <p className="text-sm" dangerouslySetInnerHTML={{ __html: `<b>${label}:</b> ${value}` }}></p>
      <div className="flex justify-end">
        <Button color="green" onClick={onEdit}>Edit</Button>
        <Button color="darkRed" onClick={onRemove}>Remove</Button>
      </div>
    </Box>
  )
};