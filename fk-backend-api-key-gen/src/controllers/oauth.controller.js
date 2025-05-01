import { OAuth2Client } from "google-auth-library";
import fetch from 'node-fetch';
import 'dotenv/config'


// Initialize OAuth2Client with your credentials
const oAuth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_OAUTH_REDIRECT,
});


export const getUserInfo = async (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent'
    });

    const code = req.query.code; // Received from the callback
    const { tokens } = await oAuth2Client.getToken(code);
    const accessToken = tokens.access_token;

    await oAuth2Client.setCredentials(accessToken);
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials}`);
    const data = await response.json();
    console.log('User Info:', data);   
    res.redirect(303, `${process.env.FRONTEND_AD_ATTRIBUTION}/profile?data=`+ JSON.stringify(data));

}
  
