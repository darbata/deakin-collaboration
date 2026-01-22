import type {Discussion} from "@/types/Discussion.ts";
import {Avatar} from "@/components/ui/avatar.tsx";
import {AvatarImage} from "@radix-ui/react-avatar";
import {CornerDownRight, MessageCircleReply, ThumbsUp} from "lucide-react";
import {type JSX, type MouseEventHandler} from "react";
import {useNavigate} from "react-router-dom";

type DiscussionButton = {
    icon: JSX.Element;
    label: string;
    onClick: MouseEventHandler
}

export function DiscussionNode ({ discussion, depth }: { discussion: Discussion, depth: number }) {

    const MAX_DEPTH = 5;

    const navigate = useNavigate();

    if (depth >= MAX_DEPTH) return (
        <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate(`/discussions/threads/${discussion.parentDiscussionId}`)}
        >
            <CornerDownRight size={16} />
            <span>Continue</span>

        </div>
    )


    const buttons: DiscussionButton[] = [
        {
            icon: <ThumbsUp />,
            label: "Like",
            onClick: () => {}
        },
        {
            icon: <MessageCircleReply />,
            label: "Reply",
            onClick: () => {}
        }
    ]


    return (
        <div className="ml-4 border-l-2 py-2 pl-4 flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <Avatar className="border border-border">
                    <AvatarImage src={discussion.user.avatarUrl} />
                </Avatar>
                <div className="font-semibold">{discussion.user.displayName}</div>
            </div>
            <p>{discussion.content}</p>
            <div className="flex gap-4">
                {
                    buttons.map((button) => (
                        <div className="flex gap-1 items-center text-sm cursor-pointer" onClick={button.onClick}>
                            <span className="flex items-center w-4 h-4">
                                {button.icon}
                            </span>
                            <span>{button.label}</span>
                        </div>
                    ))
                }
            </div>
            {discussion.discussions?.map((d) => (
                <DiscussionNode key={d.id} discussion={d} depth={depth+1} />
            ))}

        </div>
    );
}