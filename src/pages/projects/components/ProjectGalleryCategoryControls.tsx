import {TagIcon} from "@/components/icons/TagIcon";
import {GlobeIcon} from "lucide-react";
import {ProjectCategory} from "@/pages/projects/components/ProjectCategory.tsx";

export function ProjectGalleryCategoryControls({handleSet, activeCategory} : {handleSet: (category: "featured" | "community") => void; activeCategory: "featured" | "community"}) {
    return (
        <div className="flex flex-col mb-2">
            <div className="flex gap-4">
                <ProjectCategory handleClick={() => handleSet("featured")} active={activeCategory == "featured"}  icon={<TagIcon size="16"/>}>DSEC Featured</ProjectCategory>
                <ProjectCategory handleClick={() => handleSet("community")} active={activeCategory == "community"} icon={<GlobeIcon size={16}/>}>Community</ProjectCategory>
            </div>
            <hr/>
        </div>
    )
}