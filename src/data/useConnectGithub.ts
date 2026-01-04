import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const endpoint = "http://localhost:8080/api/connect_github";

async function connectGithub(code : string, idToken : string) {
    const response = await axios.post(
        endpoint,
        {code: code},
        {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        }
    )
    return response.data;
}

export function useConnectGithub() {
    return useMutation({
        mutationFn: (
                {code, idToken} : {code: string, idToken: string}
            ) => connectGithub(code, idToken),
    })
}
