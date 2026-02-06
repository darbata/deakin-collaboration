import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarArrowUp, GithubIcon, LayoutDashboard, StarIcon} from "lucide-react";
import {type FeaturedProject} from "@/types/FeaturedProject.ts";
import {useNavigate} from "react-router-dom";

export function FeaturedProjectCard({project} : {project : FeaturedProject}) {

    const navigate = useNavigate();

    const lastUpdated = new Date(project.repoPushedAt);
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const daysSinceLastUpdate = Math.ceil(diff / (1000 * 3600 * 24));

    return (
        <Card className="py-0 overflow-hidden">
            <CardHeader
                className="relative h-[200px] bg-primary"
                style={{
                    backgroundImage: `linear-gradient(to top right, rgba(0, 0, 0, 0.9), transparent)`
                }}
            >
                <div className="absolute left-6 bottom-4 text-background flex flex-col gap-2`">
                    <h3 className="font-bold text-2xl">
                        {project.title}
                    </h3>
                    <p className="text-lg text-background">
                        {project.tagline}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex h-[200px] flex-col justify-between gap-10">
                <p className="text-foreground">{project.description}</p>
                <div className="flex flex-col gap-4 justify-center text-sm">
                    <Separator />
                    <div className="flex justify-between items-center text-muted-foreground">
                        <div className="flex gap-1 items-center">
                            <CalendarArrowUp size={14} />
                            <span>{daysSinceLastUpdate} days since last update</span>
                        </div>
                        <div className="flex gap-1 items-center bg-muted rounded-xl px-2">
                            <StarIcon size={14} />
                            <span>{project.repoStars}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-2 w-full bg-muted flex justify-evenly items-center h-[80px] gap-2">
                <Button
                    variant="outline"
                    className="flex items-center w-full shrink h-10 "
                    onClick={() => {window.location.href = project.repoUrl}}
                >
                    <GithubIcon />
                    <span className="font-semibold">Repository</span>
                </Button>
                <Button
                    className="flex items-center w-full shrink h-10 "
                    onClick={() => {navigate(`${project.id}`)}}
                >
                    <LayoutDashboard />
                    <span className="font-semibold">Dashboard</span>
                </Button>
            </CardFooter>
        </Card>
    )
}