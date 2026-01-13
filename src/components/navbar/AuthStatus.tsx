import {useAuth} from "react-oidc-context";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {useAuthenticatedUser} from "@/data/useAuthenticatedUser";
import {ConnectGithub} from "@/components/navbar/ConnectGithub";


export default function Profile() {

    const auth = useAuth();

    const {
        data: user,
        isLoading,
        isError
    } = useAuthenticatedUser(auth.user?.id_token ?? "");

    if (!auth.isAuthenticated)
        return <Button onClick={() => auth.signinRedirect()}>Sign in</Button>

    if (isLoading) return <div>loading</div> // todo: skeleton
    if (isError) return <div>error</div>
    if (user && user.githubProfile == null) return <ConnectGithub />

    return (
        <div className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src={user?.githubProfile?.avatar_url} />
            </Avatar>
            <p>{user?.githubProfile?.login}</p>
        </div>
    )
}