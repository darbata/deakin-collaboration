import type {Category} from "@/pages/projects/components/CategorySelector.tsx";

export function CategorySectionDescription({category} : {category: Category}) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-muted-foreground text-2xl font-semibold">{category.sectionTitle}</h3>
            <p className="text-muted-foreground font-medium max-w-[760px]">{category.sectionDescription}</p>
        </div>
    )
}