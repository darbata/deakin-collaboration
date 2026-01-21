import type {Discussion} from "@/types/Discussion.ts";

export function DiscussionNode ({ discussion }: { discussion: Discussion }) {
    return (
        <div className="ml-4 border-l-2 pl-4">
            <div className="font-bold">{discussion.user.displayName}</div>
            <p>{discussion.content}</p>
            {/* Recursively render child discussions */}
            {discussion.discussions?.map((child) => (
                <DiscussionNode key={child.content} discussion={child} />
            ))}
        </div>
    );
};