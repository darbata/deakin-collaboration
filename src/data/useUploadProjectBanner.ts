import {useMutation} from "@tanstack/react-query";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import axios from "axios";
import {useAuth} from "react-oidc-context";

export function useUploadProjectBanner() {

    const auth = useAuth();

    return useMutation({
        mutationFn: async ({projectId, file} : {projectId: string, file: File}) => {
            const {data: uploadUrl} = await axios.put(
                `${apiBaseUrl}/projects/featured/${projectId}/banner`,
                null,
                {
                    params: {type: file.type},
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                }
            );
            await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            });
        }
    });
}
