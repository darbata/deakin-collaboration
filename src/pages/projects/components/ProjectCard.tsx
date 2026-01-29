import {Button} from "@/components/ui/button";
import {Github, MessageSquare} from "lucide-react";
import {LanguageTag} from "@/pages/projects/components/LanguageTag.tsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import type {UserProject} from "@/types/UserProject.ts";


type projectProps = {
    project: UserProject;
}

export function ProjectCard({project} : projectProps) {
    return (
        <Card className="px-4 py-4 w-full border border-border rounded-lg">
            <CardHeader className="flex justify-between  items-center pr-4">
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src={project.ownerAvatarUrl} />
                    </Avatar>
                    <p className="text-muted-foreground text-xl truncate">{project.ownerDisplayName}</p>
                </div>
                <LanguageTag language={project.repoLanguage} />
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                <h4 className="font-semibold text-xl truncate">{project.title}</h4>
                <p className="text-muted-foreground truncate">{project.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button
                    className="h-fit cursor-pointer w-full bg-background text-foreground hover:bg-muted border border-foreground"
                    onClick={() => window.open(project.repoUrl)}
                >
                    {/*todo: replace this as lucide github is deprecated*/}
                    <Github />
                    <span>Repository</span>
                </Button>
            </CardFooter>
        </Card>
    )
}