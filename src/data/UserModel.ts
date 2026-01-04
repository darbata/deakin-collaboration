export type UserModel = {
    id: string;
    email: string;
    name: string;
    githubConnected: boolean;
    githubId: number;
    githubUser: string;
    githubUrl: string;
    githubAvatarUrl: string;
    isAdmin: boolean;
    isMember: boolean;
}