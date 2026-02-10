import PageHeader from "@/components/PageHeader.tsx";
import {useLocation} from "react-router";
import ProjectBoard from "@/pages/projects/ProjectItems.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import ClaimIssueDialogue from "@/pages/projects/components/ClaimIssueDialogue.tsx";
import {useState} from "react";

export default function ProjectDashboardPage() {

    const location = useLocation();
    const projectId = location.pathname.split('/')[2];

    console.log(projectId)

    return (
        <section className="flex flex-col gap-4">
            <PageHeader
                header="Project Dashboard"
                description="Live feed of project activity and contributions"
            />
            <Separator />
            <ProjectBoard projectId={projectId} />
        </section>
    )
}