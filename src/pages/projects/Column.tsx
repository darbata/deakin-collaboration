import type {ProjectItem} from "@/types/ProjectItem.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ProjectItemCard} from "@/pages/projects/ProjectItemCard.tsx";

export function Column({projectId, title, items}: { projectId: string, title: string; items: ProjectItem[] }) {
    return (
        <div className="flex flex-col gap-2 ">
            <div className="flex rounded-xl w-fit text-muted-foreground text-sm font-semibold">
                <span className="">{title.toUpperCase()}</span>
                <span
                    className="ml-2">- {items.length} {items.length > 1 ? "items" : "item"}</span>
            </div>
            <ScrollArea className="max-h-[80vh]">
                <div className="flex flex-col gap-2 pr-2">
                    {items.map((item) => <ProjectItemCard projectId={projectId} key={item.url} item={item}/>)}
                </div>
            </ScrollArea>
        </div>
    );
}