import type {Discussion} from "@/types/Discussion.ts";
import {CornerDownRight, MessageCircleReply} from "lucide-react";
import {type JSX, type MouseEventHandler, useState} from "react";
import {useNavigate} from "react-router-dom";
import ReplyBox from "@/pages/discussions/components/ReplyBox.tsx";

type DiscussionButton = {
    icon: JSX.Element;
    label: string;
    onClick: MouseEventHandler
}

export function DiscussionNode ({rootDiscussionId, discussion, depth }: {rootDiscussionId: string; discussion: Discussion; depth: number;}) {

    const [open, setOpen] = useState(false);
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
            icon: <MessageCircleReply />,
            label: "Reply",
            onClick: () => {setOpen(!open)}
        }
    ]


    const date = new Date(discussion.createdAt);

    return (
        <div className={`ml-4 border-l-2 py-2 pl-4 flex flex-col gap-2` }>
            <div className="flex flex-col">
                <div className="flex flex-col text-xs">
                    <span className="font-bold">{discussion.user.displayName}</span>
                    <span className="text-muted-foreground">Posted on {date.toLocaleDateString()}</span>
                </div>
                <p>{discussion.content}</p>
            </div>
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
            {open && <ReplyBox rootDiscussionId={rootDiscussionId} key={discussion.id} parentDiscussionId={discussion.id} setOpen={setOpen}  />}
            {discussion.discussions?.map((d) => (
                <DiscussionNode key={d.id} rootDiscussionId={rootDiscussionId} discussion={d} depth={depth+1} />
            ))}
        </div>
    );


}