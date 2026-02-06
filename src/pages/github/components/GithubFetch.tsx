import {useConnectGithub} from "@/data/useConnectGithub.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "react-oidc-context";
import {useEffect} from "react";

export default function GithubFetch() {
    const auth = useAuth();
    const idToken = auth.user?.id_token ?? "";
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { mutate, isPending } = useConnectGithub(idToken);

    useEffect(() => {
        const code = searchParams.get("code");
        if (code && idToken) {
            mutate(code, {
                onSuccess: () => {
                    navigate("/profile", { replace: true });
                }
            });
        }
    }, [idToken, searchParams, mutate, navigate]);

    if (isPending) return <div>Connecting...</div>;
    return <div>Connected</div>;
}