import {Button} from "@/components/ui/button.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

type FrequentlyAskedQuestion = {
    question: string;
    answer: string;
}

const faq: FrequentlyAskedQuestion[] = [
    {
        question: "What is Basecamp?",
        answer: "Basecamp is a web app made by Deakin Software Engineering Club (DSEC), built to encourage" +
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
            <section className="mt-16 lg:grid lg:grid-cols-12 w-full">
                    <div className="col-span-7 flex flex-col justify-center w-full gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold w-fit flex flex-col">
                                <span className="border rounded px-2 w-fit">Basecamp </span>
                            </div>
                            <h1 className="font-bold text-5xl w-fit">Go beyond OnTrack.</h1>
                        </div>
                        <p>Join DSEC to access community projects with beginner-friendly tickets. Learn Git and Software Engineering in a low-stress environment.</p>
                        <div className="flex gap-2 w-fit">
                            <Button variant="outline">Learn More</Button>
                            <Button variant="default">Sign Up</Button>
                        </div>
                    </div>
                    <div className="col-span-5 lg:flex justify-center items-center w-full hidden lg:">
                        <img className="max-w-[400px]" src="/undraw-collaboration.svg" alt=""/>
                    </div>
            </section>
            <section className="w-full mt-32">
                <Carousel
                    className="w-full"
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-[50%]">
                                <div className="p-1">
                                    <Card className="overflow-hidden rounded p-2">
                                        <CardContent className="flex aspect-video items-center justify-center bg-black rounded overflow-hidden">
                                            <span className="text-white text-4xl font-semibold">{index}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </section>
            <section className="flex flex-col items-center justify-center gap-4 mt-24 h-[380px]">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
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

