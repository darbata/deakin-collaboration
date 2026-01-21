import type {User} from "@/types/User.ts";

export type Discussion = {
    id: string;
    parentDiscussionId: string | null;
    content: string;
    createdAt: Date;
    user: User;
    discussions: Discussion[];
}
