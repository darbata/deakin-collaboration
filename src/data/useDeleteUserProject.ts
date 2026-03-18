import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import axios from "axios";
import type {UserProject} from "@/types/UserProject.ts";

export function useDeleteUserProject(idToken: string) {
    const queryClient = useQueryClient();
    const queryKey = ["user-shared-projects"];

    return useMutation({
        mutationFn: async (projectId: string) => {
            await axios.delete(`${apiBaseUrl}/projects/community/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
        },

        onMutate: async (projectId: string) => {
            await queryClient.cancelQueries({queryKey});

            const userProjects = queryClient.getQueryData<UserProject[]>(queryKey);

            queryClient.setQueryData<UserProject[]>(queryKey, (old) =>
                old?.filter(project => project.id !== projectId)
            )

            return {userProjects};
        },

        onError: (err, projectId, context) => {
            if (context?.userProjects) {
                queryClient.setQueryData(queryKey, context.userProjects);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(({queryKey}));
        }
    });
}
