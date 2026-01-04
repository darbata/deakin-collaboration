import { useAuth } from "react-oidc-context";
import {useConnectGithub} from "@/data/useConnectGithub";
import {useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";

export default function GithubFetch() {

    const auth = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {mutate} = useConnectGithub();


    useEffect(() => {
        const code = searchParams.get("code");
        const idToken = auth.user?.id_token;

        if (code && idToken) {
            mutate(
                {code, idToken},
                {
                    onSettled: () => {
                        navigate("/")
                    },
                    onError: (error) => {
                        console.error(error);
                    }
                }
            )
        }
    }, [navigate, searchParams, auth.user, mutate]);

    return <div>Complete</div>;
}