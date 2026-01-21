import {useParams} from "react-router-dom";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import type {TopicDetails} from "@/types/TopicDetails.ts";
import {DiscussionNode} from "@/pages/discussions/components/DiscussionNode.tsx";

const fetchTopicDetails = async (
    token: string | undefined,
    topic: string | undefined,
): Promise<TopicDetails> => {
    const response = await axios.get(
        `${apiBaseUrl}/discussions/${topic}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
    )
    return response.data;
}

export function TopicDetailsPage() {
    const {topic} = useParams();
    const auth = useAuth();
    const token = auth.user?.id_token;

    const { data } = useQuery({
        queryKey: [topic],
        queryFn: () => fetchTopicDetails(token, topic),
        enabled: !!token,
        staleTime: 5*50*1000
    });

    if (!data) return <>div</>

    const topicDetails = data.unitTopic;
    const discussions = data.discussions;

    console.log(discussions);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <span className="font-semibold text-xl">{topic}</span>
                <span className="text-muted-foreground">{topicDetails.description}</span>
            </div>
            {discussions.map((discussion) => (
                <DiscussionNode key={discussion.content} discussion={discussion}></DiscussionNode>
            ))}
        </div>


    )
}