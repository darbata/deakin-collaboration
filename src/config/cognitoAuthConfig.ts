export type AuthConfig = {
    authority: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
}

export const cognitoAuthConfig = {
    authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_r46BDZLR2",
    client_id: "rpv2du5q7aqike7keqsghi3gv",
    redirect_uri: "http://localhost:3000/",
    response_type: "code",
    scope: "email openid phone",
};
