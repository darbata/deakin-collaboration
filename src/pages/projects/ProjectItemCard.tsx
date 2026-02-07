import type {ProjectItem} from "@/types/ProjectItem.ts";
import type {ProjectAssignee} from "@/types/ProjectAssignee.ts";
import {ProjectItemLabel} from "@/pages/projects/ProjectItemLabel.tsx";
import {Avatar, AvatarGroup, AvatarGroupCount, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CircleDot} from "lucide-react";
import useClaimIssue from "@/data/useClaimIssue.ts";



export function ProjectItemCard({projectId, item}: { projectId: string, item: ProjectItem }) {
    const claim = useClaimIssue(projectId);

    const handleClaimClick = async () => {
        claim.mutate({projectId: projectId, issueNumber: item.issueNumber})
    }

    const assignees: ProjectAssignee[] = item.assignees;

    const handleMoreInfoClick = () => {
        window.location.href = item.url
    }

    return (
        <div
            className="flex flex-col gap-2 border border-l-8 border-l-primary rounded-xl py-2 px-4 justify-evenly bg-background">
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

            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {item.labels.map((label) => <ProjectItemLabel label={label}/>)}
                </div>
                {
                    assignees.length >= 1 ?
                        <AvatarGroup>
                            <Avatar>
                                <AvatarImage src={assignees[0].avatarUrl}/>
                            </Avatar>
                            {assignees.length > 1 && <AvatarGroupCount>{assignees.length - 1}</AvatarGroupCount>}
                        </AvatarGroup>
                        :
                        <Button onClick={handleClaimClick}>
                            <CircleDot/>
                            <span>Claim Issue</span>
                        </Button>
                }
            </div>
        </div>
    )
}