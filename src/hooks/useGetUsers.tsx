import { useQuery } from "react-query";

import { URLs, queryKeys } from "../util";

export const useGetUsers = () => {
  const { data, isLoading } = useQuery([queryKeys.users], () => {
    return fetch(URLs.users).then((res) => res.json());
  });

  return { users: data, isLoading };
}
