import {ProjectGalleryCategoryControls} from "@/pages/projects/components/ProjectGalleryCategoryControls.tsx";
import {ProjectGalleryFilterControls} from "@/pages/projects/components/ProjectGalleryFilterControls.tsx";
import {FeaturedProjectsDescription} from "@/pages/projects/components/FeaturedProjectsDescription.tsx";
import {ProjectGallery} from "@/pages/projects/components/ProjectGallery.tsx";
import {CommunityProjectsDescription} from "@/pages/projects/components/CommunityProjectsDescription.tsx";

export function ProjectGallerySection({activeCategory, handleSetCategory, searchFilter, setSearchFilter} :
  { activeCategory: "featured" | "community", handleSetCategory: (category: "featured" | "community") => void, searchFilter: string, setSearchFilter: (filter: string) => void}
) {
    return (
        <section>
            <ProjectGalleryCategoryControls handleSet={handleSetCategory} activeCategory={activeCategory}  />
            <div className="flex flex-col gap-2">
                <ProjectGalleryFilterControls searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
                {activeCategory == "featured" && <FeaturedProjectsDescription />}
                {activeCategory == "community" && <CommunityProjectsDescription />}
                <ProjectGallery searchFilter={searchFilter} category={activeCategory} />
            </div>
        </section>
    )
}