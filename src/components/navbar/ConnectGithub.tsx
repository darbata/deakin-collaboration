import {Button} from "@/components/ui/button";
import {clientId} from "@/config/githubClientIdConfig";

export function ConnectGithub() {

    const handleClick = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    }

    return (
        <Button onClick={handleClick}>
            Connect Github
        </Button>
    )

}