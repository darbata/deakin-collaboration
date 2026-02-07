import {create} from 'zustand';
import {clientId} from "@/config/githubClientIdConfig";
import type {User} from "@/types/User.ts";

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    connectGithub: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({user: user}),
    clearUser: () => set({user: null}),

    // redirect to Github SSO prompts user to authorise app
    // once complete redirects to /github
    connectGithub: () => {
        const githubDomain = "https://github.com/login/oauth/authorize";
        window.location.href = `${githubDomain}?client_id=${clientId}`;
    }
}));