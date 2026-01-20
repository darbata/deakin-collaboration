import {useParams} from "react-router-dom";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import type {User} from "@/data/UserModel.ts";

export type Discussion = {
    content: string;
    createdAt: Date;
    discussions: Discussion[];
    user: User;
}

const fetchTopicDetails = async (
    token: string | undefined,
    topic: string | undefined,
): Promise<Discussion[]> => {
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

    console.log(data);

    return (
        <div>{topic}</div>
    )
}