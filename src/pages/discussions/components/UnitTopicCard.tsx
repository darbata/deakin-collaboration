import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {Unit} from "@/pages/discussions/components/UnitTopicsGallery.tsx";

export default function UnitTopicCard({unit} : {unit : Unit} ) {
    return (
        <Card className="flex flex-row gap-2">
            <CardHeader className="flex flex-col gap-0">
                <span className="text-foreground font-bold text-xl">{unit.unitCode}</span>
                <span className="text-muted-foreground font-bold">{unit.description}</span>
            </CardHeader>
            <CardContent>
                <Button variant="outline">Discussions</Button>
                <Button>Unit Site</Button>
            </CardContent>
        </Card>
    )
}