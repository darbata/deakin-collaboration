import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import {Spinner} from "@/components/ui/spinner.tsx";
import type {ProjectItem} from "@/types/ProjectItem.ts";

const fetchProjectItems  = async (projectId: string, token: string | undefined) : Promise<ProjectItem[]> => {
    if (token == undefined) return [];
    const response = await axios.get(`${apiBaseUrl}/projects/featured/${projectId}/items`)
    return response.data;
}

export default function ProjectItems({projectId} : {projectId: string}) {

    const auth = useAuth();

    const {data, isLoading, isError} = useQuery({
        queryKey: ["project-items", projectId],
        queryFn: () => fetchProjectItems(projectId, auth.user?.access_token)
    });

    if (isError) return <div>error</div>

    if (isLoading) return <Spinner />

    console.log(data);

    return (
        <div>
        </div>
    )
}