Create the following variables in the .env file:

```
SITE_URL=http://localhost:3000 #set based on the environment where this is hosted
NEXTAUTH_URL=http://localhost:3000 #set based on the environment where this is hosted
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz123456 #any random number will work
GOOGLE_CLIENT_ID=[get your own]
GOOGLE_CLIENT_SECRET=[get your own]
MONGODB_URI=[get your own]
SENDGRID_API_KEY=[get your own]
MAIL_FROM=[get your own] # set based on what is used for SendGrid
```

To duplicate error:

1. Login using the mail provider option (magic link) using the same email used for your Google account
2. Optional steps - not needed to duplicate problem
    1. Login using magic link
    2. Log out
3. Log in using your Google account that is associated with the same email address used in step 1.

Notes:

- You may be able to duplicate the issue without using a valid SendGrid account / API key or value for mail_from
- You can obtain a free hosted MongoDB db at mongodb.com or install and run locally