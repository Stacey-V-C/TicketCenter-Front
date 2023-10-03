import { useQuery } from "react-query";

import type { View } from "../types";
import { URLs } from "../util";

type ResponseType = {
  views: View[];
}

export const useGetUserData = (userId: string) => {
  const { data, isLoading } = useQuery<View[], unknown>(["userData", userId], () => {
    return fetch(`${URLs.userData}/${userId}`)
      .then((res) => res.json()
        .then(({ views }: ResponseType) => views));
  });

  console.log('get user data', data)

  return { views: data || [], isGetUserDataLoading: isLoading };
};