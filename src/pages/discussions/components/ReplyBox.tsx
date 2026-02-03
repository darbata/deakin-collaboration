import {Button} from "@/components/ui/button.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {useAuth} from "react-oidc-context";
import {useForm, useStore} from "@tanstack/react-form";
import {toast} from "sonner";
import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {z} from "zod";

const formSchema = z.object({
    content: z.string().min(12)
})

export default function ReplyBox({parentDiscussionId, setOpen, } : {parentDiscussionId: string; setOpen: (open: boolean) => void; } ) {

    const auth = useAuth();

    const form = useForm({
        defaultValues: {
            content: "",
        },
        validators: {
            onSubmit: formSchema,
        },

        onSubmit: async ({value}) => {
            if (!auth.user?.access_token) {
                toast.error("You must be logged in to create a discussion");
                return;
            }

            try {
                const payload = {
                    parentDiscussionId: parentDiscussionId,
                    content: value.content,
                };

                const response = await axios.post(`${apiBaseUrl}/topics/discussions/${parentDiscussionId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${auth.user.access_token}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("request successful", response.data)

                form.reset();
                setOpen(false);
                toast.success("Created discussion successfully");
            } catch (error) {
                console.log(error);
                form.reset();
                setOpen(false);
                toast.error("Failed to create discussion try again later");
            }
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