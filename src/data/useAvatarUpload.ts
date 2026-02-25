import {useMutation} from "@tanstack/react-query";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import axios from "axios";
import {useAuth} from "react-oidc-context";

export function useAvatarUpload() {

    const auth = useAuth();

    return useMutation({
        mutationFn: async (file: File) => {
            const {data: uploadUrl} = await axios.put(
                `${apiBaseUrl}/user/avatar/upload`,
                null,
                {
                    params: {type: file.type},
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                }
            );

            console.log(uploadUrl);
            console.log(file.type)

            await axios.put(uploadUrl, file)

        }
    });
}