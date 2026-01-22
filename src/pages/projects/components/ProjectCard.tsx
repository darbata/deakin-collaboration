import {Button} from "@/components/ui/button";
import {Github, MessageSquare} from "lucide-react";
import {LanguageTag} from "@/pages/projects/components/LanguageTag.tsx";
import type {Project} from "@/types/Project.ts";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";


type projectProps = {
    project: Project;
}

export function ProjectCard({project} : projectProps) {
    return (
        <Card className="px-4 py-4 w-full border border-border rounded-lg">
            <CardHeader className="flex justify-between items-center pr-4">
                <Avatar>
                    <AvatarImage src={project.ownerAvatarUrl} />
                </Avatar>
                <p className="text-muted-foreground text-xl truncate w-[60%]">{project.ownerDisplayName}</p>
                <LanguageTag language={project.repo.language} fill="#3178C6" textColour="#FFFFFF" />
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                <h4 className="font-semibold text-xl truncate">{project.title}</h4>
                <p className="text-muted-foreground truncate">{project.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button
                    className="h-fit cursor-pointer w-[50%] bg-background text-foreground hover:bg-muted border border-foreground"
                    onClick={() => window.open(project.repo.url)}
                >
                    {/*todo: replace this as lucide github is deprecated*/}
                    <Github />
                    <span>Repository</span>
                </Button>
                <Button className="h-fit cursor-pointer w-[50%] bg-foreground text-primary-foreground hover:bg-muted-foreground">
                    <MessageSquare />
                    <span>Contact</span>
                </Button>
            </CardFooter>
        </Card>
    )
}