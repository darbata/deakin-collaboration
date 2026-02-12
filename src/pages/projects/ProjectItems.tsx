import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import {Spinner} from "@/components/ui/spinner.tsx";
import type {ProjectItem} from "@/types/ProjectItem.ts";
import {Column} from "@/pages/projects/Column.tsx";
import {MessageCircleQuestionMark} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card.tsx";

const fetchProjectItems  = async (projectId: string, token: string | undefined) : Promise<ProjectItem[]> => {
    if (!token) return [];
    const response = await axios.get(`${apiBaseUrl}/projects/featured/${projectId}/items`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return response.data;
}

export default function ProjectBoard({projectId} : {projectId: string}) {

    const auth = useAuth();

    const {data, isLoading, isError} = useQuery({
        queryKey: ["project-items", projectId],
        queryFn: () => fetchProjectItems(projectId, auth.user?.access_token),
        enabled: !!projectId && !!auth.user?.access_token // wait for auth to ready
    });

    if (isError || isLoading || !data) return (
        <div className="flex justify-center w-full items-center">
            <Spinner />
        </div>
    )

    return (
        <section className="flex flex-col gap-4">
            <div className="grid lg:grid-cols-2 gap-8">
                <Column projectId={projectId} title="To-Do" items={data.filter((item) => item.status === "Todo")} />
                <Column projectId={projectId} title="In Progress" items={data.filter((item) => item.status === "In Progress")} />

            </div>
            <Card className="bg-muted text-muted-foreground justify-center mt-16">
                <CardContent className="flex gap-4 items-center justify-center">
                    <MessageCircleQuestionMark size={48} />
                    <span>Don't see something that fits your skills? Drop a suggestion in <i>#ticket-requests</i> and we'll get a ticket started for you.</span>
                </CardContent>
            </Card>
        </section>
    )
}