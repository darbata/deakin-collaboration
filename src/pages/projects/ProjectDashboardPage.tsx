import PageHeader from "@/components/PageHeader.tsx";
import ProjectItems from "@/pages/projects/ProjectItems.tsx";
import {useLocation} from "react-router";

function ProjectBoard() {
    return null;
}

export default function ProjectDashboardPage() {

    const location = useLocation();
    const projectId = location.pathname.split('/')[2];

    console.log(projectId)


    return (
        <section>
            <PageHeader
                header="Project Dashboard"
                description="Live feed of project activity and contributions"
            />
            <ProjectBoard />
            <ProjectItems projectId={projectId}>
            </ProjectItems>
        </section>
    )
}