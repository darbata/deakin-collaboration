import {useState} from "react";
import {type Category, CategorySelector} from "@/pages/projects/components/CategorySelector.tsx";
import {GlobeIcon, LucideGraduationCap} from "lucide-react";
import {SearchFilter} from "@/pages/projects/components/SearchFilter.tsx";
import {CategorySectionDescription} from "@/pages/projects/components/CategorySectionDescription.tsx";


const categories: Category[] = [
    {
        identifier: "deakin-units",
        icon: <LucideGraduationCap />,
        buttonLabel: "Deakin Units",
        sectionTitle: "Deakin Unit Topics",
        sectionDescription: "Science and Information Technology (SIT) topics to find conversations related to these classes.",
    },
    {
        identifier: "community",
        icon: <GlobeIcon />,
        buttonLabel: "Community",
        sectionTitle: "Community Topics",
        sectionDescription: "See what others are talking about outside of just university.",
    },
]

export default function DiscussionsPage() {
    const [activeCategory, setActiveCategory] = useState("deakin-units");
    const [searchFilter, setSearchFilter] = useState("");

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">Discussions</h2>
                <p className="text-muted-foreground">See what the community is talking about. Start your own topic to spark a discussion.</p>
            </div>
            <CategorySelector categories={categories} activeCategory={activeCategory} handleSet={setActiveCategory} />
            <SearchFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
            {activeCategory == categories[0].identifier && <CategorySectionDescription category={categories[0]} />}
            {activeCategory == categories[1].identifier && <CategorySectionDescription category={categories[1]} />}
        </div>
    )
}