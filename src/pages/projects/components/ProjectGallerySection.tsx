import {ProjectGalleryCategoryControls} from "@/pages/projects/components/ProjectGalleryCategoryControls.tsx";
import {useState} from "react";
import {ProjectGalleryFilterControls} from "@/pages/projects/components/ProjectGalleryFilterControls.tsx";
import {FeaturedProjectsDescription} from "@/pages/projects/components/FeaturedProjectsDescription.tsx";
import {ProjectGallery} from "@/pages/projects/components/ProjectGallery.tsx";

export function ProjectGallerySection() {

    const [activeCategory, setActiveCategory] = useState<"featured" | "community">("featured");
    const [searchFilter, setSearchFilter] = useState("");

    function handleSet(category : "featured" | "community") {
        setActiveCategory(category);
    }

    return (
        <section>
            <ProjectGalleryCategoryControls handleSet={handleSet} activeCategory={activeCategory}  />
            <div className="flex flex-col gap-2">
                {/*todo: implement language filter*/}
                <ProjectGalleryFilterControls searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
                {activeCategory == "featured" && <FeaturedProjectsDescription />}
                <ProjectGallery />
            </div>
        </section>
    )
}