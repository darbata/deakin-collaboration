import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useAuth} from "react-oidc-context";
import type {DiscussionThread} from "@/pages/discussions/DiscussionThreadPage.tsx";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";
import type {User} from "@/types/User.ts";
import type {Discussion} from "@/types/Discussion.ts";

export default function useReplyToDiscussion(rootDiscussionid: string) {
    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const queryClient = useQueryClient();
    const queryKey = ["discussion", rootDiscussionid];
    const authUser: User = useAuthenticatedUser(token).data!;

    console.log("useCreateDiscussion" + rootDiscussionid);

    return useMutation({
        mutationFn: async ({parentDiscussionId, content} : {parentDiscussionId: string; content: string}) => {
            const payload = {
                parentDiscussionId: parentDiscussionId,
                content: content,
            };

            const {data} = await axios.post(`${apiBaseUrl}/topics/discussions/${parentDiscussionId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            return data
        },

        onMutate: async (data) => {
            await queryClient.cancelQueries({queryKey});
            const thread = queryClient.getQueryData<DiscussionThread>(queryKey)

            if (thread) {
                queryClient.setQueryData<DiscussionThread>(queryKey, (old) => {
                    if (!old) return old;

                    const thread: DiscussionThread = JSON.parse(JSON.stringify(old));

                    const reply : Discussion = {
                        id: "123",
                        parentDiscussionId: data.parentDiscussionId,
                        content: data.content,
                        createdAt: new Date,
                        user: authUser,
                        discussions: [],
                    }

                    const replyToComment = (node: Discussion) => {
                        if (node.id == reply.parentDiscussionId) {
                            node.discussions = [...(node.discussions || []), reply];
                            return true;
                        }
                        if (node.discussions) {
                            for (const child of node.discussions) {
                                if (replyToComment(child)) return true;
                            }
                        }
                        return false;
                    };

                    replyToComment(thread.rootDiscussion)
                    return thread;
                })
            }


            return thread;
        }
    })
}
