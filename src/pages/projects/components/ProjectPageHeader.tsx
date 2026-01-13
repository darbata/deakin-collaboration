import {Button} from "@/components/ui/button";
import PlusIcon from "@/components/icons/PlusIcon";

export function ProjectPageHeader({handleClick} : {handleClick : () => void}){

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">Projects</h2>
                <p className="text-muted-foreground">Contribute to DSEC projects or share your own with the community</p>
            </div>
            <Button className="h-10 py-3 -x-2" onClick={handleClick}>
                <PlusIcon width="16" height="16" fill="currentColor" />
                <span>Submit Project</span>
            </Button>
        </div>
    )
}