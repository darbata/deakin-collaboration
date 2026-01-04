import {GitFork, Star, UsersRound} from "lucide-react";

export type GithubStatsVariant = {
    variant : "stars" | "forks" | "contributors";
}

export function GithubStats({variant, count} : {variant: GithubStatsVariant["variant"]; count: number}) {

    const defaultStyles = "flex items-center gap-1 text-sm text-muted-foreground";

    switch (variant) {
        case "stars":
            return (
                <div className={defaultStyles}>
                    <Star size={16} /> <p>{count}</p> </div>
            )
        case "forks":
            return (
                <div className={defaultStyles}>
                    <GitFork size={16} />
                    <p>{count}</p>
                </div>
            )
        case "contributors":
            return (
                <div className={defaultStyles}>
                    <UsersRound size={16} />
                    <p>{count}</p>
                </div>
            )
    }
}