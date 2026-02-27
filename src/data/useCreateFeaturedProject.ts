import {useAuth} from "react-oidc-context";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {FeaturedProject} from "@/types/FeaturedProject.ts";

type CreateProjectRequest = {
    title: string;
    tagline: string;
    description: string;
    githubRepoId: number;
    projectNumber: number;
}

export default function useCreateFeaturedProject() {
    const auth = useAuth();
    const token = auth.user?.id_token ?? "";

    return useMutation<FeaturedProject, Error, CreateProjectRequest>({
        mutationFn: async ({title, tagline, description, githubRepoId, projectNumber} : CreateProjectRequest) =>
        {
            const response = await axios.post(
                `${apiBaseUrl}/projects/featured`,
                {
                    title: title,
                    tagline: tagline,
                    description: description,
                    repoId: githubRepoId,
                    projectNumber: projectNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            return response.data;
        },
    })
}
