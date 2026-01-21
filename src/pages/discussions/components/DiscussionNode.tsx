import type {Discussion} from "@/types/Discussion.ts";
import {Avatar} from "@/components/ui/avatar.tsx";
import {AvatarImage} from "@radix-ui/react-avatar";
import {MessageCircleReply, ThumbsUp} from "lucide-react";

export function DiscussionNode ({ discussion }: { discussion: Discussion }) {
    return (
        <div className="ml-4 border-l-2 py-2 pl-4 gap-2">
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarImage src={discussion.user.avatarUrl} />
                </Avatar>
                <div className="font-semibold">{discussion.user.displayName}</div>
            </div>
            <p>{discussion.content}</p>
            <div className="flex gap-4">
                <div className="flex gap-1 items-center text-sm">
                    <ThumbsUp size="16" />
                    <span>Like</span>
                </div>
                <div className="flex gap-1 items-center text-sm">
                    <MessageCircleReply size="16" />
                    <span>Reply</span>
                </div>
            </div>
            {discussion.discussions?.map((child) => (
                <DiscussionNode key={child.content} discussion={child} />
            ))}

        </div>
    );
};