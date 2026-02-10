import {useParams} from "react-router-dom";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import type {TopicDetails} from "@/types/TopicDetails.ts";
import {RootDiscussionCard} from "@/pages/discussions/components/RootDiscussionCard.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import CreateDiscussionDialog from "@/pages/discussions/components/CreateDiscussionDialog.tsx";

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
    const [open, setOpen] = useState(false);
    const {topic} = useParams();
    const auth = useAuth();
    const token = auth.user?.id_token;

    const { data } = useQuery({
        queryKey: ["topic-details", topic],
        queryFn: () => fetchTopicDetails(token, topic),
        enabled: !!token,
    });

    if (!data) return <>div</>

    const topicDetails = data.unitTopic;
    const discussions = data.discussions;


    const handleCreateDiscussionButtonClick = () => {
        setOpen(!open)
    }

    return (
        <div className="flex flex-col gap-2 ">
            <div className="flex justify-between pr-8 items-center mt-4">
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-2xl">{topic}</span>
                    <span className="text-muted-foreground">{topicDetails.description}</span>
                </div>
                <Button variant="default" className="font-semibold" onClick={handleCreateDiscussionButtonClick}>
                    <span>Start New Discussion For This Unit</span>
                </Button>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
                {discussions.map((discussion) => (
                    <RootDiscussionCard key={discussion.content} discussion={discussion}></RootDiscussionCard>
                ))}
            </div>
            <CreateDiscussionDialog open={open} setOpen={setOpen} unitCode={topic ? topic : ""} />
        </div>
    )
}