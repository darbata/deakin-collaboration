export default function PageHeader({header, description} : {header: string; description: string;}) {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">
                    {header}
                </h2>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            <br/>
        </div>
    )
}
