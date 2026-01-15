import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Accordion, AccordionContent, AccordionTrigger,} from "@/components/ui/accordion.tsx";
import {AccordionItem} from "@radix-ui/react-accordion";
import {Button} from "@/components/ui/button.tsx";

type CollaborationCard = {
    main: string;
    supporting: string;
}

const collaborationCards : CollaborationCard[] = [
    {
        main: "Discover Open Projects",
        supporting: "Want to build your skills but not sure how to practice? Browse beginner-friendly student projects open for contribution."
    },
    {
        main: "Discussion Forums",
        supporting: "See what others are talking about, whether you want to gain insight into your next unit or ask for help."
    },
    {
        main: "Melbourne Events",
        supporting: "View events that others are hosting or planning to attend. This way you can stay in the loop, or even form your next hackathon team!"
    }
]

type FrequentlyAskedQuestion = {
    question: string;
    answer: string;
}

const faq: FrequentlyAskedQuestion[] = [
    {
        question: "What is Basecamp?",
        answer: "Basecamp is a web app made by Deaking Software Engineering Club (DSEC), built to encourage" +
            "collaboration among students at Deakin. Users will gain the opportunity to build their skills and " +
            "resume with real-world projects."
    },
    {
        question: "How do I get started?",
        answer: "First sign up. After, have a look at either 'DSEC Featured' projects which will be targeted " +
            "towards beginners and first-time contributors. These projects are managed by DSEC executives who " +
            "will actively help you in making your first few contributions."
    },
    {
        question: "What prerequisites do I need to participate?",
        answer: "Please create a Github account as well as get Git set up on your device."
    },
    {
        question: "How does the contribution process work?",
        answer: "You will be working with real industry tools, we will guide you through using Git and Github." +
            " and submitting your first few pull requests."
    },
    {
        question: "What technologies are used?",
        answer: "While we don't strictly stick to a specific tech stack, we do try to prefer those taught" +
            " in Deakin SIT units such as Python, C# and React. This way you're boh learning for your units " +
            "and your career."
    },
]

export default function HomePage () {
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-2 mt-[12vh]">
                <span className="border border-border text-foreground rounded px-4">Open Source Student Collaboration</span>
                <h1 className="text-[clamp(2.5rem,8vw-1rem,4.5rem)] font-bold text-center text-foreground">
                    Build the future together
                </h1>
                <span className="text-[clamp(1rem,1vw+0.5rem,1.25rem)] text-center leading-tight text-muted-foreground text-pretty w-[60%]">
                    Connect with students, contribute to open-source projects, and grow your skills through real collaboration
                </span>
                <div className="flex gap-8 mt-8">
                    <Button variant="outline" className="aspect-[8/2]">Learn More</Button>
                    <Button variant="default" className="aspect-[8/2]">Sign Up</Button>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center gap-4 mt-[10vh]">
                <h2 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-bold text-center text-foreground" >
                    Everything you need to collaborate
                </h2>
                <span className="text-[clamp(1rem,1vw+0.5rem,1.25rem)] text-center leading-tight text-muted-foreground text-pretty w-[60%] mb-12">
                    Basecamp brings together the tools and community to make student collaboration effortless
                </span>
                <div className="w-[90%] grid gap-4 grid-cols-1 lg:grid-cols-3 ">
                    {collaborationCards.map((project) =>
                        <Card key={project.main} className="flex">
                            <CardContent className="h-full w-full flex flex-col gap-4">
                                <span className="block text-foreground text-2xl font-bold">{project.main}</span>
                                <span className="block text-muted-foreground text-xl font">{project.supporting}</span>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>
            <section className="flex flex-col items-center justify-center gap-4 mt-[2vh] h-[380px]">
                <Accordion
                    type="single"
                    collapsible
                    className="w-[75%] "
                    defaultValue="item-1"
                >
                    {faq.map((project) =>
                        <AccordionItem value={project.question} className="text-foreground">
                            <AccordionTrigger>{project.question}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance border-b">
                                <p>{project.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    )}

                </Accordion>
            </section>

        </>
    )
}

