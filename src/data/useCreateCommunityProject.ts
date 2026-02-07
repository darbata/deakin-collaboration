import {useAuth} from "react-oidc-context";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {UserProject} from "@/types/UserProject.ts";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";
import type {Page} from "@/types/Page.ts";

export default function useCreateCommunityProject() {
    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const {data: user} = useAuthenticatedUser(token);
    const queryKey = ["projects", "community"];
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({title, description, githubRepoId}: {title: string; description: string; githubRepoId: number;}) => {
            await axios.post(
                `${apiBaseUrl}/projects/community`,
                {
                    title: title,
                    description: description,
                    repoId: githubRepoId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                }
            });

        },

        onMutate: async ({title, description, githubRepoId}) => {

            await queryClient.cancelQueries({queryKey});

            const projects = queryClient.getQueryData<UserProject[]>(queryKey);

            const newProject: UserProject = {
                id: "123",
                title: title,
                description: description,
                ownerAvatarUrl: user?.avatarUrl ?? "",
                ownerDisplayName: user?.displayName ?? "",
                repoId: githubRepoId,
                repoLanguage: "Unknown",
                repoUrl: "",
                repoOpenTickets: 0,
                repoStars: 0,
                repoPushedAt: new Date()
            }


            queryClient.setQueryData<Page<UserProject>>(
                queryKey,
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        content: [...old.content, newProject]
                    }
                }
            )

            return {projects};
        },

        onError: (_error, _variables, context) => {
            if (context?.projects) {
                queryClient.setQueryData(queryKey, context.projects);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey});
        }
    })
}