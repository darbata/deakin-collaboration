import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import type {User} from "@/types/User.ts";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";
import {useAuth} from "react-oidc-context";
import PageHeader from "@/components/PageHeader.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {GithubIcon, ImageUpIcon, MailIcon, PencilIcon, UserIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {useEffect, useState} from "react";
import {clientId} from "@/config/githubClientIdConfig.ts";
import {useNavigate} from "react-router-dom";
import {useDisconnectGithub} from "@/data/useDisconnectGithub.ts";

export default function ProfilePage() {

    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const {data, isLoading} = useAuthenticatedUser(token);
    const disconnectGithub = useDisconnectGithub(token);

    const [isEditing, setIsEditing] = useState(false);

    const [userDisplayName, setUserDisplayName] = useState("");

    useEffect(() => {
        if (data) {
            setUserDisplayName(data.displayName)
        }
    }, [data])

    const updateDisplayName = () => {
        return;
        // add endpoint
    }

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const handleFileChange = (event) => {
        const selected = event.target.files[0];
        if (!selected) return;
        setFile(selected);
        const previewUrl = URL.createObjectURL(selected);
        setPreview(previewUrl);
        console.log(selected);
    }

    const handleFileUpload = () => {
        setFile(null);
        // add endpoint
    }

    const handleNameEdit = (event) => {
        setUserDisplayName(prev => (event.target.value));
    }

    const redirectGithubAuth = () => {
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
        window.location.href = url
    }


    if (isLoading || !data) return <div></div>

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
                            <AvatarImage src={preview == "" ? data.avatarUrl : preview}/>
                        </Avatar>


                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">{data.displayName}</span>
                            <span className="text-sm">{data.email}</span>
                            <input
                                type="file"
                                id="pfp"
                                name="pfp"
                                onChange={handleFileChange}
                                hidden
                                accept="image/jpeg, image/png"
                            />
                            <div className="flex flex-col gap-1">
                                {
                                    file
                                        ?   <Button className="flex items-center gap-1" onClick={handleFileUpload}>
                                                <ImageUpIcon />
                                                <span>Update Photo</span>
                                            </Button>
                                        :   <>
                                                <Button className="w-full" variant="outline">
                                                <label htmlFor="pfp" className="flex items-center gap-1">
                                                    <ImageUpIcon />
                                                    <span>Upload Photo</span>
                                                </label>
                                                </Button>
                                                <span className="text-xs ml-auto text-muted-foreground">.png, .jpg</span>
                                            </>
                                }
                            </div>
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
                        <div className="flex flex-col">
                            <span className="font-semibold">Display Name</span>
                        {
                            isEditing ?
                                <input
                                    type="text"
                                    value={userDisplayName}
                                    onChange={handleNameEdit}
                                    className="border rounded border-primary px-2"
                                />
                            :
                                <span>{userDisplayName}</span>
                        }

                        </div>
                        <Button onClick={() => {setIsEditing(true)}} variant="outline" className="ml-auto aspect-square w-fit"><PencilIcon /></Button>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-2">
                        <div className="bg-muted p-4 rounded-xl">
                            <MailIcon size={24}   />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Email Address</span>
                            <span>{data.email}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full max-w-[900px]">
                <CardHeader>
                    <span className="font-semibold">Connections</span>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-muted p-4 rounded-xl">
                            <GithubIcon size={24}   />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Github</span>
                        </div>
                        {
                            data.githubConnected
                                ? <Button className="ml-auto" onClick={() => disconnectGithub.mutate()}>Disconnect GitHub</Button>
                                : <Button className="ml-auto" onClick={redirectGithubAuth}>Connect GitHub</Button>
                        }
                    </div>
                </CardContent>
            </Card>
            <div className="flex w-full max-w-[900px]">
                <Button onClick={updateDisplayName} hidden={!isEditing} disabled={userDisplayName == data.displayName} className="ml-auto self-baseline">Save Changes</Button>
            </div>
        </section>
    )
}