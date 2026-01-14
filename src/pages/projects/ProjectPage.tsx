import {ProjectPageHeader} from "@/pages/projects/components/ProjectPageHeader.tsx";
import {ProjectGallerySection} from "@/pages/projects/components/ProjectGallerySection.tsx";
import {useState} from "react";
import CreateProjectDialog from "@/pages/projects/CreateProjectDialog.tsx";


export default function ProjectsPage() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<"featured" | "community">("featured");
    const [searchFilter, setSearchFilter] = useState("");

    const handleSubmitProjectBtnClick = () => {
        setOpen(!open)
    }

    function handleSetCategory(category : "featured" | "community") {
        setActiveCategory(category);
    }

    return (
        <section className="flex flex-col gap-2">
            <ProjectPageHeader handleClick={handleSubmitProjectBtnClick} activeCategory={activeCategory} />
            <ProjectGallerySection
                activeCategory={activeCategory}
                handleSetCategory={handleSetCategory}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
            />
            <CreateProjectDialog open={open} setOpen={setOpen} />
        </section>
    )
}