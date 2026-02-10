import {Button} from "@/components/ui/button.tsx";
import {Field, FieldError, FieldGroup} from "@/components/ui/field.tsx";
import {useForm, useStore} from "@tanstack/react-form";
import {z} from "zod";
import useCreateDiscussion from "@/data/useCreateDiscussion.tsx";

const formSchema = z.object({
    content: z.string()
})

export default function ReplyBox({rootDiscussionId, parentDiscussionId, setOpen} : {rootDiscussionId: string; parentDiscussionId: string; setOpen: (open: boolean) => void; } ) {

    const reply = useCreateDiscussion(rootDiscussionId);

    const form = useForm({
        defaultValues: {
            content: "",
        },
        validators: {
            onSubmit: formSchema,
        },

        onSubmit: async ({value}) => {
            reply.mutate({parentDiscussionId: parentDiscussionId, content: value.content});
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
        <div className="flex flex-col gap-2">
            <form id="create-discussion-form" onSubmit={handleSubmit}>
                <FieldGroup>
                    <form.Field
                        name="content"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
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
            <Button
                type="submit"
                form="create-discussion-form"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md align-"
                disabled={isSubmitting || !canSubmit}
            >
                {isSubmitting ? "Creating..." : "Submit Reply"}
            </Button>
        </div>
    )
}