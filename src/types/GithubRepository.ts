import type {GithubRepositoryOwner} from "@/types/GithubRepositoryOwner.ts";

export type GithubRepository = {
    id: number;
    full_name: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    pushed_at: string;
    owner: GithubRepositoryOwner;
}