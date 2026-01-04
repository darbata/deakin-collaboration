import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import {ProjectCard} from "@/pages/projects/components/ProjectCard.tsx";

// 1. Define types for better DX
interface Project {
    id: string;
    title: string;
    description: string;
    // add other fields based on your API response
}

const token = localStorage.getItem("token");

const fetchData = async (): Promise<Project[]> => {
    const { data } = await axios.get("http://localhost:8080/api/user/profile/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
};

// 2. getServerSideProps must be in a Page file, not a standalone component file
export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["projects"],
        queryFn: fetchData,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export function ProjectGallery() {
    // 3. The component uses the data from the cache (pre-populated by SSR)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchData,
    });

    console.log(data);

    if (isLoading) return <div>Loading projects...</div>;
    if (isError) return <div>Error fetching projects.</div>;

    return (
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {data?.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}