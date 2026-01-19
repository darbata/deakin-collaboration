import type {JSX} from "react";
import {CategoryOption} from "@/pages/projects/components/CategoryOption.tsx";

export type Category = {
    icon : JSX.Element;
    identifier: string;
    label: string;
}


export function CategorySelector({categories, handleSet, activeCategory} : {
    categories: Category[];
    handleSet: (s:string) => void;
    activeCategory: string
}) {
    return (
        <div className="flex flex-col mb-2">
            <div className="flex gap-4">
                {categories.map((c) => (
                    <CategoryOption
                        key={c.identifier}
                        category={c}
                        active={activeCategory === c.identifier}
                        handleClick={() => handleSet(c.identifier)}
                    />
                ))}
            </div>
            <hr/>
        </div>
    )
}