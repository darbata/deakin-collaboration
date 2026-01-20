export type User = {
    email: string;
    name: string;
}

type GithubProfile = {
    id: number;
    login: string;
    url: string;
    avatar_url: string;
}

export type UserModel = {
    user: User;
    githubProfile: GithubProfile | null;
}