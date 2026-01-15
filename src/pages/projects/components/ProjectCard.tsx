import {Button} from "@/components/ui/button";
import {Github, MessageSquare} from "lucide-react";
import {LanguageTag} from "@/pages/projects/components/LanguageTag.tsx";
import type {Project} from "@/pages/projects/components/ProjectGallery.tsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";


type projectProps = {
    project: Project;
}

export function ProjectCard({project} : projectProps) {
    return (
        <Card className="px-4 py-4 w-full border border-border rounded-lg">
            <CardHeader className="flex justify-between items-center pr-4">
                <p className="text-muted-foreground text-xl">{project.ownerUsername}</p>
                <LanguageTag language={project.githubRepoLanguage} fill="#3178C6" textColour="#FFFFFF" />
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                <h4 className="font-semibold text-xl">{project.title}</h4>
                <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button className="h-fit cursor-pointer w-[50%] bg-background text-foreground hover:bg-muted border border-foreground">
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