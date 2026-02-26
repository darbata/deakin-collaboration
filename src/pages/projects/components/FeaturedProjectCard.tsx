import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {GithubIcon, LayoutDashboard} from "lucide-react";
import {type FeaturedProject} from "@/types/FeaturedProject.ts";
import {useNavigate} from "react-router-dom";

export function FeaturedProjectCard({project} : {project : FeaturedProject}) {
    const navigate = useNavigate();

    const backgroundImage = project.bannerUrl === ""
        ? "linear-gradient(to top right, rgba(0, 0, 0, 0.9), transparent)"
        : `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%), url(${project.bannerUrl})`;

    return (
        <Card className="py-0 overflow-hidden justify-between">
            <CardHeader
                className="relative bg-primary h-48 aspect-[4/3] bg-cover bg-no-repeat bg-bottom"
                style={{
                    backgroundImage: backgroundImage
                }}
            >
                <div className="absolute left-6 bottom-4 text-background flex flex-col justify-end">
                    <h3 className="font-bold text-2xl line-clamp-1">
                        {project.title}
                    </h3>
                    <p className="text-lg text-background line-clamp-1">
                        {project.tagline}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="h-full flex-1">
                <div className="flex flex-col">
                    <p className="text-foreground text-sm line-clamp-3">{project.description}</p>
                </div>
            </CardContent>
            <CardFooter className="p-4 w-full bg-muted flex justify-evenly items-center gap-2">
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