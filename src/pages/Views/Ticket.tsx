import { Box } from "../../ds/Box";

type Ticket = {
  area: string;
  content: string;
}

export const Ticket = ({
  area,
  content
}: Ticket) => (
  <Box color='yellow'>
    <h4 className="text-2xl font-bold">{area}</h4>
    <p className="text-lg">{content}</p>
  </Box>
);