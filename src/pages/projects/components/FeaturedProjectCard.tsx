import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarArrowUp, GithubIcon, LayoutDashboard, SquareKanbanIcon, StarIcon} from "lucide-react";
import {type JSX} from "react";
import {type FeaturedProject} from "@/types/FeaturedProject.ts";
import {useNavigate} from "react-router-dom";

type Stat = {
    icon: JSX.Element;
    label: string;
    statistic: number;
    description: string;
}

function Stat({stat} : {stat: Stat}) {

    return (
        <Card className="bg-gray-100 w-full border-none text-gray-500">

            <CardContent className="flex flex-col gap-2">
                <div className="flex gap-2">
                    {stat.icon}
                    <span>{stat.label}</span>
                </div>
                <span className="font-bold text-4xl text-foreground">{stat.statistic}</span>
                <span className="text-sm">{stat.description}</span>
            </CardContent>

        </Card>
    )

}

export function FeaturedProjectCard({project} : {project : FeaturedProject}) {

    const navigate = useNavigate();

    const lastUpdated = new Date(project.repoPushedAt);
    const now = new Date();
    const diff = now - lastUpdated;
    const daysSinceLastUpdate = Math.ceil(diff / (1000 * 3600 * 24));

    const stats: Stat[] = [
        {
            icon: <SquareKanbanIcon />,
            label: "Open Tickets",
            statistic: project.repoOpenTickets,
            description: "beginner-friendly"
        },
    ]

    return (
        <Card className="py-0 overflow-hidden">
            <CardHeader
                className="relative h-[300px] bg-cover bg-center  "
                style={{backgroundImage: `linear-gradient(to top right, rgba(0, 0, 0, 0.9), transparent), url(${project.bannerUrl}`}}
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
            <CardContent className="flex h-[450px] flex-col justify-evenly gap-10">
                <p className="text-foreground">{project.description}</p>
                <div className="flex gap-6">
                    {
                        stats.map((stat) => (
                            <Stat key={stat.label} stat={stat} />
                        ))
                    }
                </div>

                <Separator />
                <div className="flex justify-between items-center text-muted-foreground">
                    <div className="flex gap-2 items-center">
                        <CalendarArrowUp />
                        <span>{daysSinceLastUpdate} days since last update</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <StarIcon />
                        <span>{project.repoStars} stars</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="w-full bg-muted flex items-center h-[100px] p-4 gap-4">
                <Button
                    variant="outline"
                    className="flex items-center w-full shrink h-12"
                    onClick={() => {window.location.href = project.repoUrl}}
                >
                    <GithubIcon />
                    <span className="font-semibold text-lg">View on Github</span>
                </Button>
                <Button
                    className="flex items-center w-full shrink h-12"
                    onClick={() => {navigate(`${project.id}`)}}
                >
                    <LayoutDashboard />
                    <span className="font-semibold text-lg">See Dashboard</span>
                </Button>
            </CardFooter>
        </Card>
    )
}