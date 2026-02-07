import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useAuth} from "react-oidc-context";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {ProjectItem} from "@/types/ProjectItem.ts";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";

const claimIssue = async (token: string, projectId: string, issueNumber: number) => {
    return await axios.post(`${apiBaseUrl}/projects/featured/${projectId}/${issueNumber}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default function useClaimIssue(projectId: string) {
    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const user = useAuthenticatedUser(token).data;
    const queryClient = useQueryClient();
    const queryKey = ["project-items", projectId];

    return useMutation({
        mutationFn: (
            {issueNumber} :
            {projectId: string; issueNumber: number}
        ) => claimIssue(token, projectId, issueNumber),

        onMutate: async ({issueNumber}) => {
            await queryClient.cancelQueries({queryKey})
            const previous = queryClient.getQueryData<ProjectItem[]>(queryKey)

            if (previous) {
                queryClient.setQueryData<ProjectItem[]>(queryKey, (old) =>
                    old?.map((item) => {
                        if (item.issueNumber === issueNumber) {
                            return {
                                ...item,
                                status: "In Progress",
                                assignees: [{
                                    name: user?.displayName ?? "",
                                    login: user?.displayName ?? "",
                                    avatarUrl: user?.avatarUrl ?? "",
                                }]
                            };
                        }
                        return item;
                    })
                );
            }

            return { previous };

        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey});
        }
    })
}
