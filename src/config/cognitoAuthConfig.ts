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
    redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
    response_type: "code",
    scope: "phone openid email profile",
};
