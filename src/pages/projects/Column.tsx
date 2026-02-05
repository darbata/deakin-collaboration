import type {ProjectItem} from "@/types/ProjectItem.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ProjectItemCard} from "@/pages/projects/ProjectItemCard.tsx";

export function Column({projectId, title, items}: { projectId: string, title: string; items: ProjectItem[] }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex px-4 py-1 rounded-xl w-fit">
                <span className="text-lg font-semibold">{title}</span>
                <span
                    className="text-lg font-semibold ml-2">- {items.length} {items.length > 1 ? "items" : "item"}</span>
            </div>
            <ScrollArea className="max-h-[80vh]">
                <div className="flex flex-col gap-2 pr-2">
                    {items.map((item) => <ProjectItemCard projectId={projectId} key={item.url} item={item}/>)}
                </div>
            </ScrollArea>
        </div>
    );
}