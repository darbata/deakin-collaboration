import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import {Spinner} from "@/components/ui/spinner.tsx";
import type {ProjectItem} from "@/types/ProjectItem.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Avatar, AvatarImage, AvatarGroup, AvatarGroupCount} from "@/components/ui/avatar";
import type {ProjectAssignee} from "@/types/ProjectAssignee.ts";
import {Button} from "@/components/ui/button.tsx";
import {CircleDot} from "lucide-react";
import type {ProjectLabel} from "@/types/ProjectLabel.ts";

const fetchProjectItems  = async (projectId: string, token: string | undefined) : Promise<ProjectItem[]> => {
    if (!token) return [];
    const response = await axios.get(`${apiBaseUrl}/projects/featured/${projectId}/items`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return response.data;
}

function ProjectItemLabel({label} : {label: ProjectLabel}) {

    const beginner = label.name == "good first issue";

    return (
        <div
            className={`rounded px-4 py-1 text-primary-foreground text-sm`}
            style={{backgroundColor: `#${beginner ? "08A045"  : label.color}`}}
        >
            {label.name}
        </div>
    )
}

function ProjectItemCard({item} : {item : ProjectItem}) {

    const assignees : ProjectAssignee[] = item.assignees;

    const handleMoreInfoClick = () => {
        window.location.href = item.url
    }

    return (
        <div className="flex flex-col gap-2 border border-l-8 border-l-primary rounded-xl py-2 px-8 justify-evenly bg-background">
            <div>
                <span
                    className="font-semibold cursor-pointer"
                    onClick={handleMoreInfoClick}
                >
                    {item.title}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span>{item.body}</span>
                <div className="flex gap-2">
                    {item.labels.map((label) => <ProjectItemLabel label={label}/>)}
                </div>
            </div>
            <div className="flex justify-end">

                {
                    assignees.length >= 1 ?
                        <AvatarGroup>
                            <Avatar>
                                <AvatarImage src={assignees[0].avatarUrl} />
                            </Avatar>
                            {assignees.length > 1 && <AvatarGroupCount>{assignees.length - 1}</AvatarGroupCount>}
                        </AvatarGroup>
                    :
                        <Button>
                            <CircleDot />
                            <span>Claim Issue</span>
                        </Button>
                }
            </div>
        </div>
    )
}

function Column({ title, items }: { title: string; items: ProjectItem[] }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex border-l-2 border-b-2 px-4 py-1 rounded-xl w-fit">
                <span className="text-lg font-semibold">{title}</span>
                <span className="text-lg font-semibold ml-2">- {items.length} items</span>
            </div>
            <ScrollArea className="max-h-[80vh]">
                <div className="flex flex-col gap-2 pr-2">
                    {items.map((item) => <ProjectItemCard key={item.url} item={item} />)}
                </div>
            </ScrollArea>
        </div>
    );
}

export default function ProjectBoard({projectId} : {projectId: string}) {

    const auth = useAuth();

    const {data, isLoading, isError} = useQuery({
        queryKey: ["project-items", projectId],
        queryFn: () => fetchProjectItems(projectId, auth.user?.access_token),
        enabled: !!projectId && !!auth.user?.access_token // wait for auth to ready
    });

    if (isError || !data) return <div></div>

    if (isLoading) return <Spinner />

    console.log(data);

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Column title="To-Do" items={data.filter((item) => item.status === "Todo")} />
            <Column title="In Progress" items={data.filter((item) => item.status === "In Progress")} />
        </div>
    )
}