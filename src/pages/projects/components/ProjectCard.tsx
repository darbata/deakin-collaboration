import { Button } from "@/components/ui/button";
import { Github, Code2, User } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";
import type { UserProject } from "@/types/UserProject.ts";

export function ProjectCard({ project }: { project: UserProject }) {
    return (
        <Card className="p-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-semibold">
                        {project.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{project.ownerDisplayName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Code2 size={14} />
                            <span>{project.repoLanguage}</span>
                        </div>
                    </div>

                    <Button
                        onClick={() => window.open(project.repoUrl)}
                        variant="outline"
                        className="flex items-center"
                    >
                        <Github size={16} />
                        View Repository
                    </Button>
                </div>


            </div>
        </Card>
    );
}