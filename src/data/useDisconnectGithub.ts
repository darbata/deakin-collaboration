import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import axios from "axios";
import type {User} from "@/types/User.ts";

export function useDisconnectGithub(idToken: string) {
    const queryClient = useQueryClient();
    const queryKey = ["user-profile", idToken];

    return useMutation({
        mutationFn: async () => {
            await axios.delete(`${apiBaseUrl}/github/oauth`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
        },

        onMutate: async () => {
            await queryClient.cancelQueries({queryKey});

            const previousUser = queryClient.getQueryData<User>(queryKey);

            if (previousUser) {
                queryClient.setQueryData<User>(queryKey, {
                    ...previousUser,
                    githubConnected: false
                });
            }

            return {previousUser};
        },

        onError: (_error, _newUser, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(queryKey, context.previousUser);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(({queryKey}));
        }
    });
}