import {type Dispatch, type SetStateAction} from "react";
import {Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog.tsx";
import * as z from "zod";
import {useForm, useStore} from "@tanstack/react-form";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import { Button } from "@/components/ui/button";
import useCreateNewDiscussion from "@/data/useCreateNewDiscussion.ts";

const formSchema = z.object({
    content: z.string()
})

export default function CreateDiscussionDialog(
    {open, setOpen, unitCode}
    : {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, unitCode: string}
) {
    const create = useCreateNewDiscussion(unitCode);
    const form = useForm({
        defaultValues: {
            content: "",
        },
        validators: {
            onSubmit: formSchema,
        },

        onSubmit: async ({value}) => {
            create.mutate({content: value.content});
            setOpen(false);
        }
    })

    const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
    const canSubmit = useStore(form.store, (state) => state.canSubmit);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent >
                <form id="create-discussion-form" onSubmit={handleSubmit}  className="flex">
                    <FieldGroup>
                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Discussion Content</FieldLabel>
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            autoComplete="off"
                                            className="h-[200px] w-full overflow-y-auto resize-none p-2 rounded border border-border"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="create-discussion-form"
                        className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md w-full"
                        disabled={isSubmitting || !canSubmit}
                    >
                        {isSubmitting ? "Creating..." : "Create Discussion"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
