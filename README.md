# NextJs Prismic Starter

## Features
- Multilanguage
- Contact Form (Nodemailer) 
- Basic Mailchimp Subscription Form

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

Install Prismic Slicemachine
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


Run Slicemachine
```bash
npm run slicemachine  
```

## Notes
- All UI Texts are stored in /data/UIContent.json

## Issues
- So far, you have to push all costum types by hand to prismic

## Roadmap
- Make Contact Form editable in Prismic
- Move UIContents to Prismic