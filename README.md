# User Manual
---

### Getting started:

1. Make sure you have Node.js [v20.10.0+](https://nodejs.org/download/release/v20.10.0/) installed 
2. Copy the contents of "website/.env.example" to "website/.env"
3. Fill in the environment variables as follows:  
> - `NEXT_PUBLIC_APP_URL` can be `http://localhost:3000` unless you're planning to publish this website in the future > then you use the actual domain name  
> - `AUTH_SECRET` and `TOKEN_SECRET` can be any random string as it is used to Sign the JWT Tokens we create for authentication  
> - `MONGODB_URI` Create a Free database and paste the Connection URI here Here's a short [tutorial](https://youtu.be/pILdgCr4w3s) on how to do so  
> - Next is creating a Google OAuth2.0 Client, go to https://console.cloud.google.com/welcome -> APIs and services -> Credentials -> + Create Credentials -> after creating them -> Accept the consents in OAuth consent screen and publish app then you can fill in `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
> - Go to https://resend.com/ and create an Account for free and it will give you an API key, you can paste in `RESEND_API_KEY` and use the same email for `RESEND_EMAIL_URL`
> - For `EMAIL_USER` You can use any email here (you will be sending emails from it) usually this will be the business' email e.g. contact@company.com. To get `EMAIL_PASSWORD` go to [this link](https://myaccount.google.com/apppasswords) and sign in -> create new app and copy the password, it will be in this format `xxxx xxxx xxxx xxxx`  
4. Open a new terminal and run `cd website; npm i; npm run dev` to start the project in development environment
5. To create a final production build, you can run `npm run build` then `npm run start` to run it