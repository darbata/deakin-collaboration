import type {ProjectLabel} from "@/types/ProjectLabel.ts";

export function ProjectItemLabel({label}: { label: ProjectLabel }) {

    const beginner = label.name == "good first issue";

    return (
        <div
            className={`rounded h-fit p-0 px-2 text-xs text-primary-foreground text-sm flex items-center`}
            style={{backgroundColor: `#${beginner ? "08A045" : label.color}`}}
        >
            {label.name}
        </div>
    )
}