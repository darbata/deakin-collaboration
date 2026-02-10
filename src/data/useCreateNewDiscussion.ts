import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import type {TopicDetails} from "@/types/TopicDetails.ts";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useAuth} from "react-oidc-context";
import type {Discussion} from "@/types/Discussion.ts";
import type {User} from "@/types/User.ts";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";

export default function useCreateNewDiscussion(topicId: string) {
    const auth = useAuth();
    const token = auth.user?.id_token ?? "";
    const queryClient = useQueryClient();
    const queryKey = ["topic-details", topicId];
    const user: User = useAuthenticatedUser(token).data!;

    return useMutation({
        mutationFn: async ({content}: {content: string;}) => {

            const payload = {
                parentDiscussionId: null,
                content: content
            };

            const {data} = await axios.post(`${apiBaseUrl}/topics/${topicId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            return data;
        },

        onMutate: async ({content}) => {
            await queryClient.cancelQueries({queryKey});

            const details = queryClient.getQueryData<TopicDetails>(queryKey);

            const discussion: Discussion = {
                id: "123",
                parentDiscussionId: null,
                content: content,
                createdAt: new Date,
                user: user,
                discussions: []
            }

            queryClient.setQueryData(queryKey, (old: TopicDetails) => {
                if (!old) return old;
                return {
                    ...old,
                    discussions: [discussion, ...old.discussions]
                }
            })

            return {details}
        }
    })
}