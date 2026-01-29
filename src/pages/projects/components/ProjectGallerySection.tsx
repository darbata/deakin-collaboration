import {ProjectGallery} from "@/pages/projects/components/ProjectGallery.tsx";
import {SearchFilter} from "@/pages/projects/components/SearchFilter.tsx";
import {type Category, CategorySelector} from "@/pages/projects/components/CategorySelector.tsx";
import {GlobeIcon, Tag} from "lucide-react";
import {CategorySectionDescription} from "@/pages/projects/components/CategorySectionDescription.tsx";


const categories : Category[] = [
    {
        identifier: "featured",
        icon: <Tag/>,
        buttonLabel: "Featured",
        sectionTitle: "Software Engineering Club Projects",
        sectionDescription: "Projects managed by DSEC execs perfect for first-time contributors. Not sure how to contribute? Contact Us."
    },
    {
        identifier: "community",
        icon: <GlobeIcon />,
        buttonLabel: "Community",
        sectionTitle: "Community Projects",
        sectionDescription: "Join peer projects open for all levels. Contribute to repositories, make an impact, meet others who share your drive!"
    },
]

export function ProjectGallerySection({activeCategory, handleSetCategory, searchFilter, setSearchFilter} :
  { activeCategory: string, handleSetCategory: (s:string) => void, searchFilter: string, setSearchFilter: (filter: string) => void}
) {
    return (
        <section className="flex flex-col gap-2">
            <CategorySelector categories={categories} handleSet={handleSetCategory} activeCategory={activeCategory}  />
            <div className="flex flex-col gap-4">
                <SearchFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
                {activeCategory == categories[0].identifier && <CategorySectionDescription category={categories[0]} />}
                {activeCategory == categories[1].identifier && <CategorySectionDescription category={categories[1]} />}
                <ProjectGallery searchFilter={searchFilter} category={activeCategory} />
            </div>
        </section>
    )
}