import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {ProjectCard} from "@/pages/projects/components/ProjectCard.tsx";
import {useAuth} from "react-oidc-context";


type Page<T> = {
    content: T[];
    sortCol: string;
    ascending: boolean;
    pageSize: number;
    pageNum: number;
}

export type Project = {
    title: string;
    description: string;
    githubRepoId: number;
    githubRepoName: string;
    githubRepoUrl: string;
    githubRepoLanguage: string;
    ownerUsername: string;
}

const fetchProjects = async (token : string | undefined, pageNum : number, pageSize: number): Promise<Page<Project>> => {
    const response = await axios.get(
        "http://localhost:8080/api/projects/",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            params: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        }
    )

    return response.data;
}

export function ProjectGallery() {


    const auth = useAuth();
    const token = auth?.user?.id_token;


    const { data, isLoading, isError } = useQuery({
        queryKey: ["projects", 0],
        queryFn: () => fetchProjects(token, 0, 50),

    });

    console.log(data);


    if (isLoading) return <div>Loading projects...</div>;
    if (isError) return <div>Error fetching projects.</div>;

    return (
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {data?.content.map((project: Project) => (
                <ProjectCard key={project.githubRepoId} project={project} />
            ))}
        </div>
    );
}