export function LanguageTag({language} : {language: string}) {
    return (
        <div className="px-8 font-semibold bg-foreground text-background py-1 w-fit h-fit shrink-0 rounded inlined-block">
            <p>{language}</p>
        </div>
    )
}