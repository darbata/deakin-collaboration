export type ProjectCreateFieldType = {
    label: string;
    value: string;
    setValue: (event : any) => void;
}

export function ProjectCreateField({field} : {field: ProjectCreateFieldType}) {
    return (
        <div className="flex flex-col">
            <label htmlFor={field.label.toLowerCase()} className="font-semibold text-sm">{field.label.toUpperCase()}</label>
            <textarea
                name={field.label.toLowerCase()}
                className={`border rounded text-sm resize-none ${field.label === "description" ? "h-32" : ""} p-1`}
                value={field.value}
                onChange={field.setValue}
            />
        </div>
    )

}