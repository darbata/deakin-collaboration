import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import type {User} from "@/types/User.ts";

const endpoint = "http://localhost:8080/api/auth";

async function fetchAuthenticatedUser(idToken : string) : Promise<User> {
    const response = await axios.get(endpoint, {
        headers: {Authorization: `Bearer ${idToken}`}
    })

    return response.data;
}

export function useAuthenticatedUser(idToken : string) {
    return useQuery({
        queryKey: ["user-profile", idToken],
        queryFn: () => fetchAuthenticatedUser(idToken),
        enabled: !!idToken
    })
}



