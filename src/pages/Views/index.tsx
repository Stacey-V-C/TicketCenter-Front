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
      isTeamSettings={editingView?.name === 'Team'}
    />
  );

  const oppositeTeam = team === 'red' ? 'skyBlue' : 'red';
  const colorFromTeam = team === 'red' ? 'red' : 'skyBlue';

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
      {!isLoading ? views?.map(view => (
        <div className="w-90">
          <h2 className="text-xl font-bold">{view.name}</h2>
          {!view.plugins?.length && !view.tickets?.length ? (
            <Box color={oppositeTeam}>
              <p>View {view.name} has no plugins or tickets!</p>
            </Box>
          ) : (
            <div>
              {view.plugins?.length || userId === view.name ? (
                <Button color={oppositeTeam} onClick={() => setEditingView(view)}>
                  Edit Plugins
                </Button>
              ) : null}
              <div>
                {
                  view.tickets?.length ? (
                    view.tickets.map(ticket => (
                      <Ticket
                        key={ticket.id}
                        area={ticket.area}
                        content={ticket.content}
                      />
                    ))
                  ) : (
                    <div className="h-full w-full flex justify-center items-center">
                      <p className="z-400 opacity-50 h-full w-full"></p>
                      <p className="z-500">Loading...</p>
                    </div>
                  )
                }
              </div>
            </div>
          )}
        </div >
      )) : null}
    </div >
  )
};
