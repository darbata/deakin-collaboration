import {useState} from "react";
import {type Category, CategorySelector} from "@/pages/projects/components/CategorySelector.tsx";
import {GlobeIcon, LucideGraduationCap} from "lucide-react";
import {SearchFilter} from "@/pages/projects/components/SearchFilter.tsx";


const categories: Category[] = [
    {
        identifier: "deakin-units",
        icon: <LucideGraduationCap />,
        label: "Deakin Units",
    },
    {
        identifier: "community",
        icon: <GlobeIcon />,
        label: "Community",
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
        </div>
    )
}