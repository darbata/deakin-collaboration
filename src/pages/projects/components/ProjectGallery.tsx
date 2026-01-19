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

const fetchCommunityProjects = async (token : string | undefined, pageNum : number, pageSize: number): Promise<Page<Project>> => {
    const response = await axios.get(
        "http://localhost:8080/api/projects/community",
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

const fetchFeaturedProjects = async (token : string | undefined, pageNum : number, pageSize: number): Promise<Page<Project>> => {
    const response = await axios.get(
        "http://localhost:8080/api/projects/featured",
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

export function ProjectGallery({searchFilter, category} : {searchFilter: string; category: string}) {

    const auth = useAuth();
    const token = auth?.user?.id_token;

    const { data } = useQuery({
        queryKey: ["projects", category, 0],
        queryFn: () => category === "featured"
            ? fetchFeaturedProjects(token, 0, 50)
            : fetchCommunityProjects(token, 0, 50),
        enabled: !!token
    });

    if (data == undefined || data?.content.length <= 0) return <div></div>

    const filtered: Project[] = data.content?.filter(
        project => {
            return (
                project.ownerUsername.toLowerCase().includes(searchFilter.toLowerCase()) ||
                project.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                project.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                project.githubRepoLanguage.toLowerCase().includes(searchFilter.toLowerCase())
            );
        }
    )

    return (
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {filtered.map((project: Project) => (
                <ProjectCard key={project.githubRepoId} project={project} />
            ))}
        </div>
    );
}