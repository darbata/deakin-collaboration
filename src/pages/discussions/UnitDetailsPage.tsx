import {useParams} from "react-router-dom";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import type {TopicDetails} from "@/types/TopicDetails.ts";
import {RootDiscussionCard} from "@/pages/discussions/components/RootDiscussionCard.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const fetchTopicDetails = async (
    token: string | undefined,
    topic: string | undefined,
): Promise<TopicDetails> => {
    const response = await axios.get(
        `${apiBaseUrl}/topics/${topic}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
    )
    return response.data;
}

export function UnitDetailsPage() {
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
            <div className="flex flex-col mb-4">
                <span className="font-bold text-2xl">{topic}</span>
                <span className="text-muted-foreground">{topicDetails.description}</span>
                <Separator className="mt-2"  />
            </div>
            <div className="flex flex-col gap-2">
                {discussions.map((discussion) => (
                    <RootDiscussionCard key={discussion.content} discussion={discussion}></RootDiscussionCard>
                ))}
            </div>
        </div>
    )
}