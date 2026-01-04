import type {JSX, ReactNode} from "react";

export function ProjectCategory( {children, className, icon, active, handleClick} :
                          {children : ReactNode, className? : string, icon : JSX.Element, active? : boolean, handleClick? : () => void}
) {
    return (
        <div
            onClick={handleClick}
            className={`flex items-center gap-1 h-12 px-4 py-3 ${className ? className : ""} ${active ? "text-foreground border-b-primary border-b-2" : "text-muted-foreground" } cursor-pointer`} >
            {icon}
            <p>{children}</p>
        </div>
    )
}