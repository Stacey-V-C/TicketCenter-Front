import { useMutation, useQueryClient } from 'react-query'

import { URLs, queryKeys } from '../util';
import type { Plugin } from '../types';

export type UpdatePluginsRequest = {
  plugins: Plugin[];
  isTeamSettings: boolean;
}

export const useUpdatePlugins = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<Response, unknown, UpdatePluginsRequest>(
    ({
      plugins,
      isTeamSettings
    }) => {
      const body = JSON.stringify({
        userId,
        plugins
      })

      return fetch(
        isTeamSettings ? URLs.teamPlugins : URLs.userPlugins,
        {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          }
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([queryKeys.userData]);
      },
    }
  );

  return { updatePlugins: mutate, isUpdatePluginsLoading: isLoading }
}