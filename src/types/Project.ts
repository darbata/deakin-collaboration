import type {GithubRepository} from "@/types/GithubRepository.ts";

export type Project = {
    title: string;
    description: string;
    ownerAvatarUrl: string;
    ownerDisplayName: string;
    repo: GithubRepository;
}