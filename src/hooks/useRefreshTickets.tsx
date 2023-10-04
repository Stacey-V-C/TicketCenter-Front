import { useMutation, useQueryClient } from "react-query";
import { URLs, queryKeys } from "../util";

export const useRefreshTickets = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    () => {
      return fetch(URLs.tickets, {
        method: "POST",
      });
    },
    {
      onSettled: () => {
        queryClient.refetchQueries([queryKeys.userData]);
      }
    }
  );

  return {
    refreshTickets: mutate,
    isRefreshTicketsLoading: isLoading,
  };
};