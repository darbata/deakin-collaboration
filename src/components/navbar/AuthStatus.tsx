import {useAuth} from "react-oidc-context";
import {Button} from "@/components/ui/button";
import useAuthenticatedUser from "@/data/useAuthenticatedUser";
import {User} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu.tsx";
import {signOutConfig} from "@/config/cognitoAuthConfig.ts";
import {clientId} from "@/config/githubClientIdConfig.ts";
import {useDisconnectGithub} from "@/data/useDisconnectGithub.ts";
import {useNavigate} from "react-router-dom";

export default function Profile() {

    const auth = useAuth();
    const idToken = auth.user?.id_token ?? "";
    const navigate = useNavigate();

    const disconnectGithub = useDisconnectGithub(idToken);

    const {
        data: user,
        isLoading,
        isError
    } = useAuthenticatedUser(auth.user?.id_token ?? "");

    if (!auth.isAuthenticated) return <Button onClick={() => auth.signinRedirect()}>Sign in</Button>;
    if (isLoading || isError) return <div className="flex items-center"><User /></div>;

    const redirectProfile = () => {
        navigate("/profile");
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
                <DropdownMenuItem
                    onClick={redirectProfile}
                >
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => auth.signoutRedirect({
                        extraQueryParams: signOutConfig
                    })}
                >
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}