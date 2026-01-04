import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {AngledBracketsIcon} from "@/components/icons/AngledBracketsIcon";

export function ProjectGalleryFilterControls({
                                                 searchFilter,
                                                 setSearchFilter,
                                                 languageFilter,
                                                 setLanguageFilter
} : {
    searchFilter: string;
    setSearchFilter: (s: string) => void,
    languageFilter: string
    setLanguageFilter: (s: string) => void
} ) {
    return (
        <div className="flex gap-2">
            <Input
                className={`${searchFilter === "" ? "text-muted-foreground" : "text-foreground"} bg-background border-1 border-border rounded-4xl max-w-[200px]`}
                placeholder="Search..."
                value={searchFilter}
                onChange={(event) => setSearchFilter(event.target.value)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="text-muted-foreground cursor-pointer hover:bg-muted bg-background border-1 border-border rounded-4xl max-w-[120px]">
                        <AngledBracketsIcon size="16"/>
                        Language
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}