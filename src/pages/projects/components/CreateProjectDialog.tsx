import {type Dispatch, type SetStateAction} from "react";
import {Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog.tsx";
import * as z from "zod";
import {useForm, useStore} from "@tanstack/react-form";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button";
import useCreateCommunityProject from "@/data/useCreateCommunityProject.ts";
import {useUserGithubRepos} from "@/data/useCommunityProjects.ts";

const formSchema = z.object({
    title: z.string()
        .min(3, "Title should be descriptive.")
        .max(40, "Keep your title's short and sweet."),
    description: z.string()
        .min(12, "Make sure people can understand what your project is.")
        .max(140, "Description too long."),
    githubRepoId: z.number()
})

export default function CreateProjectDialog({open, setOpen} : {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {

    const {data} = useUserGithubRepos();
    const create = useCreateCommunityProject();

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            githubRepoId: 0
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({value}) => {
            console.log("Mutation...", value)
            await create.mutateAsync(value);
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                    <form id="create-project-form" onSubmit={handleSubmit}  className="flex">
                        <FieldGroup>
                            <form.Field
                                name="title"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Project Title</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                autoComplete="off"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                            <FieldSeparator />
                            <form.Field
                                name="description"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                className="min-h-32 resize-none resize-none border rounded "
                                                autoComplete="off"
                                            />
                                            <FieldDescription>
                                                What is the goal of the project? What do you want contributors to create?
                                            </FieldDescription>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                            <FieldSeparator />
                            <form.Field
                                name="githubRepoId"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>GitHub Repository</FieldLabel>
                                            <Select
                                                value={field.state.value === 0 ? "" : field.state.value.toString()}
                                                onValueChange={(val) => field.handleChange(Number(val))}
                                            >
                                                <SelectTrigger id={field.name}>
                                                    <SelectValue placeholder="Choose your repository" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto">
                                                    {data ? (
                                                        data.map((repo) => (
                                                            <SelectItem key={repo.id} value={repo.id.toString()}>
                                                                {repo.full_name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="p-2 text-sm text-muted-foreground">No repositories found</div>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    );
                                }}
                            />
                        </FieldGroup>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="create-project-form"
                        className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md w-full"
                        disabled={isSubmitting || !canSubmit}
                    >
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}