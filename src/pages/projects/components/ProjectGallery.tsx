import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useAuth} from "react-oidc-context";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import type {Page} from "@/types/Page.ts";
import type {FeaturedProject} from "@/types/FeaturedProject.ts";
import type {UserProject} from "@/types/UserProject.ts";
import {ProjectCard} from "@/pages/projects/components/ProjectCard.tsx";
import {FeaturedProjectCard} from "@/pages/projects/components/FeaturedProjectCard.tsx";

const fetchCommunityProjects = async (token : string | undefined, pageNum : number, pageSize: number): Promise<Page<UserProject>> => {
    const response = await axios.get(
        `${apiBaseUrl}/projects/community`,
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

const fetchFeaturedProjects = async (token : string | undefined, pageNum : number, pageSize: number): Promise<Page<FeaturedProject>> => {
    const response = await axios.get(
        `${apiBaseUrl}/projects/featured`,
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
        queryKey: ["projects", category],
        queryFn: () => category === "featured"
            ? fetchFeaturedProjects(token, 0, 50)
            : fetchCommunityProjects(token, 0, 50),
        enabled: !!token,
        staleTime: 5*50*1000
    });

    if (data == undefined || data?.content.length <= 0) return <div></div>

    const filtered: UserProject[] | FeaturedProject[] = data.content?.filter(
        project => {
            return (
                project.ownerDisplayName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                project.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                project.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                project.repoLanguage.toLowerCase().includes(searchFilter.toLowerCase())
            );
        }
    )

    return (
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {filtered.map((project) => {
                if (category === "featured") {
                    return <FeaturedProjectCard key={project.id} project={project as FeaturedProject} />;
                }
                return <ProjectCard key={project.id} project={project as UserProject} />;
            })}
        </div>
    );
}