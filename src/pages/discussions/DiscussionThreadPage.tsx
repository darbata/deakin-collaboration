import {useParams} from "react-router-dom";
import {useAuth} from "react-oidc-context";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {Discussion} from "@/types/Discussion.ts";
import {DiscussionNode} from "@/pages/discussions/components/DiscussionNode.tsx";

export type DiscussionThread = {
    rootDiscussion: Discussion
}

const fetchDiscussionThread = async (
    token: string | undefined,
    discussionId: string | undefined
): Promise<DiscussionThread> => {
    const response = await axios.get(
    `${apiBaseUrl}/topics/discussions/${discussionId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )
    return response.data;
}

export function DiscussionThreadPage() {
    const {discussionId} = useParams();
    const auth = useAuth();
    const token = auth.user?.id_token;

    const { data } = useQuery({
        queryKey: [discussionId],
        queryFn: () => fetchDiscussionThread(token, discussionId),
        enabled: !!token,
        staleTime: 5*50*1000
    });

    if (!data) return <>div</>

    return (
        <DiscussionNode discussion={data.rootDiscussion}>

        </DiscussionNode>
    )
}