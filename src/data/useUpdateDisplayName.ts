import {useMutation} from "@tanstack/react-query";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import axios from "axios";
import {useAuth} from "react-oidc-context";

export function useUpdateDisplayName() {

    const auth = useAuth();

    return useMutation({
        mutationFn: async (newDisplayName: string) => {
            await axios.put(
                `${apiBaseUrl}/user/username`,
                null,
                {
                    params: {newDisplayName: newDisplayName},
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                }
            );
        }
    });
}
