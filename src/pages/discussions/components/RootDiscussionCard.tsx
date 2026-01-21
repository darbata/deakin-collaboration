import type {Discussion} from "@/types/Discussion.ts";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {useNavigate} from "react-router-dom";

export function RootDiscussionCard({discussion} : {discussion : Discussion}) {

    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/discussions/threads/${discussion.id}`)
    }

    return (
        <Card onClick={handleClick} className="gap-2 cursor-pointer">
            <CardHeader className="flex gap-2 items-center">
                <Avatar className="size-8 rounded-full overflow-hidden object-contain">
                    <AvatarImage src={discussion.user.avatarUrl} />
                </Avatar>
                <span className="font-semibold text-lg">{discussion.user.displayName}</span>
            </CardHeader>
            <CardContent>
                <p className="text-lg">{discussion.content}</p>
            </CardContent>
        </Card>
    )
}