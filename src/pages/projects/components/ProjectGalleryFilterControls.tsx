import {Input} from "@/components/ui/input";

export function ProjectGalleryFilterControls({
                                                 searchFilter,
                                                 setSearchFilter,
} : {
    searchFilter: string;
    setSearchFilter: (s: string) => void,
} ) {
    return (
        <div className="flex gap-2">
            <Input
                className={`${searchFilter === "" ? "text-muted-foreground" : "text-foreground"} bg-background border-1 border-border rounded-4xl max-w-[300px]`}
                placeholder="Search..."
                value={searchFilter}
                onChange={(event) => setSearchFilter(event.target.value)}
            />
        </div>
    )
}