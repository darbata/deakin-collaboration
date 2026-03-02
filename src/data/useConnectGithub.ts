import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {User} from "@/types/User.ts";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";

async function connectGithub(code : string, idToken : string) {
    const response = await axios.post(
        `${apiBaseUrl}/github/oauth?code=${code}`,
        { },
        {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        }
    )
    return response.data;
}

export function useConnectGithub(idToken: string) {

    const queryClient = useQueryClient();
    const queryKey = ["user-profile", idToken]

    return useMutation({
        mutationFn: (code: string) => connectGithub(code, idToken),
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey});

            const previousUser = queryClient.getQueryData<User>(queryKey);

            if (previousUser) {
                queryClient.setQueryData<User>(queryKey, {
                    ...previousUser,
                    githubConnected: true
                })
            }

            return {previousUser};
        },
        onError: (_error, _newUser, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(queryKey, context.previousUser);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey});
        }
    });
}
