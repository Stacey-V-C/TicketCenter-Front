import { Box } from "../../ds/Box";
import { Button } from "../../ds/Button";

type Props = {
  onSelect: ({ id, team }: { id: string, team: 'red' | 'blue' }) => void;
  users: {
    red: string[];
    blue: string[];
  }
}

const colorFromTeam = (team: 'red' | 'blue') => team === 'red' ? 'red' : 'skyBlue';

const teams = ['red', 'blue'] as ('red' | 'blue')[];

export const Users = ({ onSelect, users }: Props) => (
  <div>
    <h1 className="text-xl m-4 font-bold">Select User to Login</h1>
    <div className="flex flex-row m-2">
      {teams.map((team) => (
        <Box color={colorFromTeam(team)}>
          {users?.[team]?.map((user) => (
            <Button color={colorFromTeam(team)} onClick={() => onSelect({ id: user, team })}>
              {user}
            </Button>
          ))}
        </Box>
      ))}
    </div>
  </div>
)