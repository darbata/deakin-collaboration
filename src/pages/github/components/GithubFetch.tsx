"use client";

import { useAuth } from "react-oidc-context";
import {useConnectGithub} from "@/data/useConnectGithub";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function GithubFetch() {

    const auth = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const {mutate} = useConnectGithub();


    useEffect(() => {
        const code = searchParams.get("code");
        const idToken = auth.user?.id_token;

        if (code && idToken) {
            mutate(
                {code, idToken},
                {
                    onSettled: () => {
                        router.push("/")
                    },
                    onError: (error) => {
                        console.error(error);
                    }
                }
            )
        }
    }, [router, searchParams, auth.user, mutate]);

    return <div>Complete</div>;
}