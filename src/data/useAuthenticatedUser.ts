import axios from "axios";
import type {UserModel} from "@/data/UserModel";
import {useQuery} from "@tanstack/react-query";

const endpoint = "http://localhost:8080/api/auth";

async function fetchAuthenticatedUser(idToken : string) : Promise<UserModel> {
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



