import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import type {User} from "@/types/User.ts";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";
import {useAuth} from "react-oidc-context";
import PageHeader from "@/components/PageHeader.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ImageUpIcon, MailIcon, PencilIcon, UserIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {useState} from "react";

export default function ProfilePage() {

    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const response = useAuthenticatedUser(token)

    const editDisplayName = useState(false);
    const editEmail = useState(false);

    if (!response || !response.data) return <div></div>

    const user: User = response.data;

    return (
        <section className="flex flex-col items-center w-full gap-8">
            <PageHeader header="Profile Settings" description="Manage your account details and connections." />
            <Card className="w-full max-w-[900px]">
                <CardHeader>
                    <span className="font-semibold">Profile Picture</span>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24 border border-border">
                            <AvatarImage src={user.avatarUrl}/>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">{user.displayName}</span>
                            <span className="text-sm">{user.email}</span>
                            <Button className="w-fit" variant="outline">
                                <ImageUpIcon />
                                <span>Upload Photo</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full max-w-[900px]">
                <CardHeader>
                    <span className="font-semibold">User Information</span>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-muted p-4 rounded-xl">
                            <UserIcon size={24}   />
                        </div>
                        {
                            editDisplayName ?
                            <div className="flex flex-col">
                                <span className="font-semibold">Display Name</span>
                                <span>{user.displayName}</span>
                            </div>
                            : <div>dont</div>
                        }

                        <Button variant="outline" className="ml-auto aspect-square w-fit"><PencilIcon /></Button>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-2">
                        <div className="bg-muted p-4 rounded-xl">
                            <MailIcon size={24}   />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Email Address</span>
                            <span>{user.email}</span>
                        </div>
                        <Button variant="outline" className="ml-auto aspect-square w-fit"><PencilIcon /></Button>
                    </div>
                </CardContent>
            </Card>
        </section>

    )
}