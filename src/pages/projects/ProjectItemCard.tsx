import type {ProjectItem} from "@/types/ProjectItem.ts";
import type {ProjectAssignee} from "@/types/ProjectAssignee.ts";
import {ProjectItemLabel} from "@/pages/projects/ProjectItemLabel.tsx";
import {Avatar, AvatarGroup, AvatarGroupCount, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CircleDot} from "lucide-react";
import useClaimIssue from "@/data/useClaimIssue.ts";
import {useState} from "react";
import ClaimIssueDialogue from "@/pages/projects/components/ClaimIssueDialogue.tsx";

export function ProjectItemCard({projectId, item}: { projectId: string, item: ProjectItem }) {
    const [open, setOpen] = useState<boolean>(false);

    const claim = useClaimIssue(projectId);
    const handleClaim= async () => {
        claim.mutate({projectId: projectId, issueNumber: item.issueNumber})
    }

    const assignees: ProjectAssignee[] = item.assignees;

    const handleMoreInfoClick = () => {
        window.location.href = item.url
    }

    return (
        <div
            className="flex flex-col gap-2 border border-l-8 border-l-primary rounded-xl py-1 px-2 justify-evenly bg-background">
            <div>
                <span
                    className="font-semibold cursor-pointer text-sm"
                    onClick={handleMoreInfoClick}
                >
                    {item.title}
                </span>
            </div>
            <div>

            </div>
            <div className="flex flex-col gap-2 text-sm">
                <span >{item.body}</span>
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
                        <Button className="flex gap-2 w-fit h-fit" onClick={() => setOpen(true)}>
                            <CircleDot size={10}/>
                            <span className="text-xs font-semibold">CLAIM ISSUE</span>
                        </Button>
                }
            </div>
            <ClaimIssueDialogue open={open} onOpenChange={setOpen} onConfirm={handleClaim} />
        </div>
    )
}