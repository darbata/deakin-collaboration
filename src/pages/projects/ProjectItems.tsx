import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import {Spinner} from "@/components/ui/spinner.tsx";
import type {ProjectItem} from "@/types/ProjectItem.ts";
import {Column} from "@/pages/projects/Column.tsx";

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

    console.log(data);

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Column projectId={projectId} title="To-Do" items={data.filter((item) => item.status === "Todo")} />
            <Column projectId={projectId} title="In Progress" items={data.filter((item) => item.status === "In Progress")} />
        </div>
    )
}