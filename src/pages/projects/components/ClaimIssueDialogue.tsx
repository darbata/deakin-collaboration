import {
    Dialog,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogContent,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function ClaimIssueDialogue({open, onOpenChange, onConfirm}:
    {   open: boolean;
        onOpenChange: (open: boolean) => void;
        onConfirm: () => void;
    }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] gap-8">
                <DialogHeader className="flex gap-4">
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription className="flex flex-col gap-1">
                        <span>Nice choice! Let's get you started. </span>
                        <span>Is this your first time contributing? See the contribution guide here.</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                           variant="outline"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={() => {
                        onConfirm()
                        onOpenChange(false)
                    }}  variant="default">Claim</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}