import {useAuth} from "react-oidc-context";
import {Button} from "@/components/ui/button";
import {useAuthenticatedUser} from "@/data/useAuthenticatedUser";
import {User} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu.tsx";
import {signOutConfig} from "@/config/cognitoAuthConfig.ts";
import {clientId} from "@/config/githubClientIdConfig.ts";
import {Link} from "react-router";
import {useDisconnectGithub} from "@/data/useDisconnectGithub.ts";

export default function Profile() {

    const auth = useAuth();
    const idToken = auth.user?.id_token ?? "";

    const disconnectGithub = useDisconnectGithub(idToken);

    const {
        data: user,
        isLoading,
        isError
    } = useAuthenticatedUser(auth.user?.id_token ?? "");

    if (!auth.isAuthenticated) return <Button onClick={() => auth.signinRedirect()}>Sign in</Button>;
    if (isLoading || isError) return <div className="flex items-center"><User /></div>;

    const redirectGithubAuth = () => {
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
        window.location.href = url
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <div className="flex items-center gap-2">
                        <User />
                        <span>{user?.displayName}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {
                        user?.githubConnected
                        ? <DropdownMenuItem onClick={() => disconnectGithub.mutate()}>Disconnect GitHub</DropdownMenuItem>
                        : <DropdownMenuItem onClick={redirectGithubAuth}>Connect GitHub</DropdownMenuItem>
                    }
                    <DropdownMenuItem
                        onClick={() => auth.signoutRedirect({
                            extraQueryParams: signOutConfig
                        })}
                    >
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}