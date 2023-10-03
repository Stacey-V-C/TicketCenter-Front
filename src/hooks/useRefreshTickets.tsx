import { useMutation, useQueryClient } from "react-query";
import { URLs } from "../util";

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
        queryClient.refetchQueries(["userData"]);
      }
    }
  );

  return {
    refreshTickets: mutate,
    isRefreshTicketsLoading: isLoading,
  };
};