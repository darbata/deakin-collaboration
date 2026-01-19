import type {Category} from "@/pages/projects/components/CategorySelector.tsx";

export function CategoryOption({category, active, handleClick} : {
    category: Category;
    active? : boolean;
    handleClick? : () => void}
) {
    return (
        <div
            onClick={handleClick}
            className={`flex items-center gap-1 h-12 px-4 py-3 ${active ? "text-foreground border-b-primary border-b-2" : "text-muted-foreground" } cursor-pointer`} >
            {category.icon}
            <p>{category.buttonLabel}</p>
        </div>
    )
}