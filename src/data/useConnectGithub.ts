import axios from "axios";
import {useMutation} from "@tanstack/react-query";

async function connectGithub(code : string, idToken : string) {
    const response = await axios.post(
        `http://localhost:8080/api/github/oauth?code=${code}`,
        { },
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
