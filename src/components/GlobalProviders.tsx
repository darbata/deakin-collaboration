"use client";

import {AuthProvider} from "react-oidc-context";
import type {AuthConfig} from "@/config/cognitoAuthConfig";
import {cognitoAuthConfig} from "@/config/cognitoAuthConfig";
import {QueryClient} from "@tanstack/react-query";
import {QueryClientProvider} from "@tanstack/react-query";

const authConfig: AuthConfig = cognitoAuthConfig;

const queryClient = new QueryClient();

export default function GlobalProviders(
    {children} : {children : React.ReactNode}
) {
    return (
        <QueryClientProvider client={queryClient}>
                <AuthProvider {...authConfig}>
                    {children}
                </AuthProvider>
        </QueryClientProvider>
    )
}
