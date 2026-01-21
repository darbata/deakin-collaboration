export type AuthConfig = {
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
}

// this is fine to have on client side
export const cognitoAuthConfig = {
    authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_BCgTuKJeO",
    client_id: "k2s1qkeil1sl3g6t6fkafhu28",
    redirect_uri: "http://localhost:5173/",
    response_type: "code",
    scope: "email openid phone profile",
};

export const signOutConfig = {
    client_id: "k2s1qkeil1sl3g6t6fkafhu28",
    logout_uri: "http://localhost:5173/"
}
