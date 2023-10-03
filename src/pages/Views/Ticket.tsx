import { Box } from "../../ds/Box";
import { Area } from "../../types";
import { getAreaString } from "../../util";

type Ticket = {
  area: Area;
  content: string;
}

export const Ticket = ({
  area,
  content
}: Ticket) => (
  <div className="max-w-lg">
    <Box color='yellow'>
      <h4 className="text-lg font-bold">{getAreaString(area)}</h4>
      <p className="text-md" dangerouslySetInnerHTML={{ __html: content }}/>
    </Box>
  </div>
);