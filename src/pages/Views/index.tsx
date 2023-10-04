import { useEffect, useState } from "react";

import { FunctionComponent } from "react";
import { Button } from "../../ds/Button";
import { Ticket } from "./Ticket";
import { Plugins } from "../Plugins";
import { Box } from "../../ds/Box";
import { View } from "../../types";
import { useQueryContext } from "../../hooks/useQueryContext";

type Props = {
  team: 'red' | 'blue';
  unselect: () => void;
}

export const Views: FunctionComponent<Props> = ({ team, unselect }) => {
  const { views, isLoading, userId, refreshTickets } = useQueryContext();
  const [editingView, setEditingView] = useState<View | null>(null);

  useEffect(() => {
    if (editingView) {
      setEditingView(views?.find(view => view.name === editingView.name) || null);
    }
  }, [views])

  if (editingView) return (
    <Plugins
      latestState={editingView.latestState}
      onClose={() => setEditingView(null)}
      plugins={editingView.plugins || []}
      name={editingView.name}
    />
  );

  const oppositeTeam = team === 'red' ? 'skyBlue' : 'red';
  const colorFromTeam = team === 'red' ? 'red' : 'skyBlue';

  const canEdit = (view: View) => view.plugins?.length || userId === view.name;

  return (
    <div className="flex flex-col">
      <div className="w-48 flex flex-row">
        <h1 className="text-2xl font-bold m-r-24">Views</h1>
        <Button color={colorFromTeam} onClick={refreshTickets}>
          Refresh
        </Button>
        <Button color={oppositeTeam} onClick={unselect}>
          Back
        </Button>
      </div>
      <div className="flex">
        {!isLoading ? views?.map(view => (
          <div className="w-90">
            <div className="flex p-2 items-center space-between">
              <h2 className="text-xl font-bold">{view.name}</h2>
              {canEdit(view) ? (
                <Button color={oppositeTeam} onClick={() => setEditingView(view)}>
                  Edit Plugins
                </Button>
              ) : <div className="mb-8 mt-4" />}
            </div>
            {!view.tickets?.length ? (
              <Box color={oppositeTeam}>
                <p>View {view.name} has no plugins or tickets!</p>
              </Box>
            ) : (
              <div>
                {view.tickets.map(ticket => (
                  <Ticket
                    key={ticket.id}
                    area={ticket.area}
                    content={ticket.content}
                  />
                ))}
              </div>
            )}
          </div >
        )) : null}
      </div>
    </div >
  )
};
