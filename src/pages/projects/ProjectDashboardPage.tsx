import PageHeader from "@/components/PageHeader.tsx";
import {useLocation} from "react-router";
import ProjectBoard from "@/pages/projects/ProjectItems.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useFeaturedProjectDetails} from "@/data/useProjectDetails.ts";
import type {FeaturedProject} from "@/types/FeaturedProject.ts";
import {Card, CardHeader} from "@/components/ui/card.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Code2, GithubIcon} from "lucide-react";

export default function ProjectDashboardPage() {

    const location = useLocation();
    const projectId = location.pathname.split('/')[2];
    const featuredProjectDetails = useFeaturedProjectDetails(projectId);
    const project: FeaturedProject | undefined = featuredProjectDetails.data;

    if (!project) {
        return <div><Spinner/></div>
    }

    const backgroundImage = project.bannerUrl === ""
        ? "linear-gradient(to top right, rgba(0, 0, 0, 0.9), transparent)"
        : `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%), url(${project.bannerUrl})`;

    return (
        <section className="flex flex-col gap-4">
            <div
                className="relative bg-primary w-full h-48 bg-cover bg-no-repeat bg-center rounded overflow-hidden"
                style={{backgroundImage: backgroundImage}}
            >
                <div className="absolute left-6 bottom-4 text-background flex flex-col justify-end">
                    <h3 className="font-bold text-3xl line-clamp-1">
                        {project.title}
                    </h3>
                    <p className="text-xl text-background line-clamp-1">
                        {project.tagline}
                    </p>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="font-semibold text-sm text-muted-foreground">ABOUT</span>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex gap-4 text-muted-foreground">
                    <div className="flex gap-2 items-center px-4 w-fit h-fit bg-muted rounded-full">
                        <Code2 size={14} />
                        <span className="text-sm text-">{project.repoLanguage}</span>
                    </div>
                    <div
                        onClick={() => {window.location.href = project.repoUrl}}
                        className="flex gap-2 items-center px-4 w-fit h-fit bg-muted rounded-full cursor-pointer"
                    >
                        <GithubIcon size={14} />
                        <span className="text-sm text-">Repo</span>
                    </div>
                </div>

            </div>

            <Separator/>
            <ProjectBoard projectId={projectId} />
        </section>
    )
}