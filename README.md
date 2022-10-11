# NextJs Prismic Starter

## Live
https://nextjs-prismic-starter.netlify.app/en-us

[![Netlify Status](https://api.netlify.com/api/v1/badges/fbf821b9-fa37-462a-87d6-be3d22c1a715/deploy-status)](https://app.netlify.com/sites/nextjs-prismic-starter/deploys)


## Features
- Multilanguage Support
- Prismic Slice Form Builder

## Getting Started

Install Prismic CLI
```bash
npm install -global prismic-cli
```

Create a prismic repo 
```bash
prismic theme --theme-url https://github.com/flhannich/nextjs-prismic-starter.git --conf prismicio.js 
```

Install Prismic Slicemachine
```bash
npx @slicemachine/init
```

Install Netlify CLI
```bash
npm install netlify-cli -g
```

Setup Netlify for your Project
```bash
netlify init
```

Link your local copy to netlify
```bash
netlify link
```

Create a .env.local
```
PRISMIC_API=<api>
PRISMIC_ACCESS_TOKEN=<token>
PRISMIC_REPOSITORY_NAME=<reponame>

MAILCHIMP_LIST_ID=<id>
MAILCHIMP_API_KEY=<key>
MAILCHIMP_SERVER_PREFIX=<prefix>

SMTP_SERVER=<server>
SMTP_PORT=<port>
SMTP_USER=<user>
SMTP_PASSWORD=<password>
SMTP_EMAIL_ADRESS=<contactform@mail.com>
SMTP_RECIPIENT=<recipient@mail.com>
```

Update API Endpoint in sm.json
```bash
https://your-repo.prismic.io/api/v2,
```

Push envoirment variables to netlify
```bash
netlify env:import .env.local
```

Run dev
```bash
netlify dev
```

For https, open an new instance and run
```bash
npm run dev-https
```

Subs
Run Slicemachine
```bash
npm run slicemachine  
```