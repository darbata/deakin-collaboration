export function LanguageTag({fill, textColour, language} : {fill : string, textColour: string, language: string}) {
    return (
        <div className="px-2 py-1 w-fit h-fit shrink-0 rounded text-sm font-medium inlined-block" style={{backgroundColor: fill, color: textColour}}>
            <p>{language}</p>
        </div>
    )
}