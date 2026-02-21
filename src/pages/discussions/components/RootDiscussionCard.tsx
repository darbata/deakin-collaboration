import type {Discussion} from "@/types/Discussion.ts";
import {useNavigate} from "react-router-dom";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";

export function RootDiscussionCard({discussion} : {discussion : Discussion}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/discussions/threads/${discussion.id}`)
    }

    const date = new Date(discussion.createdAt);

    return (
        <div className="flex flex-col border border-border rounded px-4 py-2 gap-2 cursor-pointer" onClick={handleClick}>
            <div className="flex gap-2">
                <Avatar>
                    <AvatarImage className="border rounded-full" src={discussion.user.avatarUrl} />
                </Avatar>
                <div className="flex flex-col text-xs">
                    <span className="font-bold">{discussion.user.displayName}</span>
                    <span className="text-muted-foreground">Posted on {date.toLocaleDateString()}</span>
                </div>
            </div>
            <span>{discussion.content}</span>
        </div>
    )
}