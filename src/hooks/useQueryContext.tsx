import { createContext, useContext } from "react";

import { useGetUserData } from "./useGetUserData";
import { useRefreshTickets } from "./useRefreshTickets";
import { UpdatePluginsRequest, useUpdatePlugins } from "./useUpdatePlugins";

import type { View } from "../types";
import { MutationOptions } from "react-query";

export type QueryContextType = {
  isLoading: boolean;
  refreshTickets: () => void;
  updatePlugins: ({
    plugins,
    isTeamSettings,
  }: UpdatePluginsRequest, options?: MutationOptions) => void;
  views: View[];
  userId: string;
}

export const QueryContext = createContext<QueryContextType | null>(null);

export const useQueryContext = () => {
    const context = useContext(QueryContext);
    
    if (context === null) {
        throw new Error("useQueryContext must be used within a QueryContextProvider");
    }
    
    return context;
}

export const QueryContextProvider = ({ userId, children }: { children: React.ReactNode, userId: string }) => {
  const { views, isGetUserDataLoading } = useGetUserData(userId);
  const { refreshTickets, isRefreshTicketsLoading } = useRefreshTickets();
  const { updatePlugins, isUpdatePluginsLoading } = useUpdatePlugins(userId);

  const isLoading = isGetUserDataLoading || isRefreshTicketsLoading || isUpdatePluginsLoading;

  return (
    <QueryContext.Provider value={{ views, isLoading, refreshTickets, updatePlugins, userId }}>
      {children}
    </QueryContext.Provider>
  );
}