import type {User} from "@/types/User.ts";

export type Discussion = {
    parentDiscussionId: string | null;
    content: string;
    createdAt: Date;
    user: User;
    discussions: Discussion[];
}
