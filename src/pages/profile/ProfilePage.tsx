import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import type {User} from "@/types/User.ts";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";
import {useAuth} from "react-oidc-context";

export default function ProfilePage() {

    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const response = useAuthenticatedUser(token)

    if (!response || !response.data) return <div></div>

    const user: User = response.data;

    return (
        <Card className="bg-background">
            <CardHeader className="flex items-center gap-4">
                <span className="text-xl font-semibold">{user.displayName}</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <span>Email: {user.email}</span>
                <span>Discord Display Name: {user.discordDisplayName}</span>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}