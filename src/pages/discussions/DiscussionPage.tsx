import {useState} from "react";
import {type Category, CategorySelector} from "@/pages/projects/components/CategorySelector.tsx";
import {LucideGraduationCap} from "lucide-react";
import {SearchFilter} from "@/pages/projects/components/SearchFilter.tsx";
import {CategorySectionDescription} from "@/pages/projects/components/CategorySectionDescription.tsx";
import UnitTopicsGallery from "@/pages/discussions/components/UnitTopicsGallery.tsx";

const categories: Category[] = [
    {
        identifier: "units",
        icon: <LucideGraduationCap />,
        buttonLabel: "Units",
        sectionTitle: "Unit Topics",
        sectionDescription: "Science and Information Technology (SIT) topics to find conversations related to these classes.",
    }
]

export default function DiscussionsPage() {
    const [activeCategory, setActiveCategory] = useState("units");
    const [searchFilter, setSearchFilter] = useState("");

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">Discussions</h2>
                <p className="text-muted-foreground">Ask questions about unit content or leave some wisdom for future students.</p>
            </div>
            <CategorySelector categories={categories} activeCategory={activeCategory} handleSet={setActiveCategory} />
            <SearchFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
            {activeCategory == categories[0].identifier && <CategorySectionDescription category={categories[0]} />}
            {activeCategory == categories[0].identifier && <UnitTopicsGallery searchFilter={searchFilter} />}
        </div>
    )
}