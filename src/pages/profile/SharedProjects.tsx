import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useUserCommunityProjects} from "@/data/useUserCommunityProjects.ts";
import {Trash} from "lucide-react";
import {useDeleteUserProject} from "@/data/useDeleteUserProject.ts";
import {toast} from "sonner";
import {useAuth} from "react-oidc-context";

export default function SharedProjects() {

    const auth = useAuth();
    const idToken = auth.user?.id_token ?? "";
    const {data, isLoading} = useUserCommunityProjects();
    const projects = data ?? [];
    const {mutate} = useDeleteUserProject(idToken);

    if (isLoading) return <div>aLoading projects...</div>

    const handleDelete = (projectId: string) => {
        toast("Delete project?", {
            description: "This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: () => {
                    mutate(projectId);
                    toast.success("Project deleted");
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => console.log("Cancelled"),
            },
        });
    };

    return (
        <Card className="w-full max-w-[900px]">
            <CardHeader>
                <span className="font-semibold">Shared Projects</span>
            </CardHeader>
            <CardContent>
                <ScrollArea>
                    <div className="flex flex-col just justify-center gap-2 ">
                        {projects.map((project) => (
                            <div className="w-full flex justify-between">
                                <span>{project.title}</span>
                                <Button onClick={() => handleDelete(project.id)} className="h-fit w-fit"><Trash size={6} /></Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}