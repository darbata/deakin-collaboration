import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {GithubProject} from "@/types/GithubProject.ts";

export function useDsecGithubProjects() {
    const auth = useAuth();
    const queryKey = ["org-projects"];

    return useQuery({
        queryKey: queryKey,
        queryFn: async () => { const response = await axios.get(
            `${apiBaseUrl}/projects/featured/organisation/projects`,
            {
                headers:
                    {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
            });
            return response.data as GithubProject[];
        },
        enabled: !!auth.user?.access_token
    });
}
