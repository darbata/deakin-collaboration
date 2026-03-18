import {ProjectPageHeader} from "@/pages/projects/components/ProjectPageHeader.tsx";
import {ProjectGallerySection} from "@/pages/projects/components/ProjectGallerySection.tsx";
import {useState} from "react";
import CreateProjectDialog from "@/pages/projects/components/CreateProjectDialog.tsx";
import {useAuth} from "react-oidc-context";
import useAuthenticatedUser from "@/data/useAuthenticatedUser.ts";

export default function ProjectsPage() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("featured");
    const [searchFilter, setSearchFilter] = useState("");

    const auth = useAuth()
    const token = auth.user?.id_token ?? "";
    const {data} = useAuthenticatedUser(token);

    const handleSubmitProjectBtnClick = () => {
        setOpen(!open)
    }


    function handleSetCategory(s : string) {
        setActiveCategory(s);
    }

    return (
        <section className="flex flex-col gap-4">
            <ProjectPageHeader
                handleClick={handleSubmitProjectBtnClick}
                activeCategory={activeCategory}
                showButton={data?.githubConnected ?? false}
            />
            <ProjectGallerySection
                activeCategory={activeCategory}
                handleSetCategory={handleSetCategory}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
            />
            {
                data?.githubConnected &&
                <CreateProjectDialog open={open} setOpen={setOpen} />
            }
        </section>
    )
}