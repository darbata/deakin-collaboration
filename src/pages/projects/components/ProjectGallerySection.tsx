import {FeaturedProjectsDescription} from "@/pages/projects/components/FeaturedProjectsDescription.tsx";
import {ProjectGallery} from "@/pages/projects/components/ProjectGallery.tsx";
import {CommunityProjectsDescription} from "@/pages/projects/components/CommunityProjectsDescription.tsx";
import {SearchFilter} from "@/pages/projects/components/SearchFilter.tsx";
import {type Category, CategorySelector} from "@/pages/projects/components/CategorySelector.tsx";
import {GlobeIcon, Tag} from "lucide-react";


const categories : Category[] = [
    {
        identifier: "featured",
        icon: <Tag/>,
        label: "Featured"
    },
    {
        identifier: "community",
        icon: <GlobeIcon />,
        label: "Community"
    },
]

export function ProjectGallerySection({activeCategory, handleSetCategory, searchFilter, setSearchFilter} :
  { activeCategory: string, handleSetCategory: (s:string) => void, searchFilter: string, setSearchFilter: (filter: string) => void}
) {
    return (
        <section>
            <CategorySelector categories={categories} handleSet={handleSetCategory} activeCategory={activeCategory}  />
            <div className="flex flex-col gap-2">
                <SearchFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
                {activeCategory == "featured" && <FeaturedProjectsDescription />}
                {activeCategory == "community" && <CommunityProjectsDescription />}
                <ProjectGallery searchFilter={searchFilter} category={activeCategory} />
            </div>
        </section>
    )
}