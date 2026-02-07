import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {GithubRepository} from "@/types/GithubRepository.ts";

export function useUserGithubRepos() {
    const auth = useAuth();
    const queryKey = ["user-repos"];

    return useQuery({
        queryKey: queryKey,
        queryFn: async () => { const response = await axios.get(
            `${apiBaseUrl}/github/repos`,
            {
                headers:
                    {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
            });
            return response.data as GithubRepository[];
        },
        enabled: !!auth.user?.access_token
    });
}