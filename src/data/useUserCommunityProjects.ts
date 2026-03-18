import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {UserProject} from "@/types/UserProject.ts";

export function useUserCommunityProjects() {
    const auth = useAuth();
    const queryKey = ["user-shared-projects"];

    return useQuery({
        queryKey: queryKey,
        queryFn: async () => { const response = await axios.get(
            `${apiBaseUrl}/projects/community/user`,
            {
                headers:
                    {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
            });
            return response.data as UserProject[];
        },
        enabled: !!auth.user?.access_token,
    });
}
