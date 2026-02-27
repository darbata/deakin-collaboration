import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {FeaturedProject} from "@/types/FeaturedProject.ts";

export function useFeaturedProjectDetails(projectId: string) {
    const auth = useAuth();
    const queryKey = ["featured-project", projectId];

    return useQuery({
        queryKey: queryKey,
        queryFn: async () => { const response = await axios.get(
            `${apiBaseUrl}/projects/featured/${projectId}`,
            {
                headers:
                    {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
            });
            return response.data as FeaturedProject;
        },
        enabled: !!auth.user?.access_token
    });
}
