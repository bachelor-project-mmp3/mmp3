# Setup with starter (Kerstin already did that)

-   https://vercel.com/guides/nextjs-prisma-postgres

# Run Project

-   create .env file with following variables
    DATABASE_URL=.... (your local postgresql database)
    CLIENT_ID=....
    CLIENT_SECRET=....
    NEXTAUTH_URL="http://localhost:3000/"
    NEXTAUTH_SECRET=....
-   run `npm install`
-   then run `npm run dev`

# DB schema

-   in /prisma/schema.prisma we will define our database models
-   run `npx prisma studio` to add new data to database (currently users and events)

-   For docomentation (CRUD, migrations...) visit https://www.prisma.io/docs/concepts/components/prisma-client

## Migrations

`npx prisma migrate dev` for local migrations

-   add field to schema.prisma and run `npx prisma migrate dev --name added_defined_fields_to_event`

### Production migrations

First setup Heroku connection:

-   for migrations in production login in terminal to heroku `heroku login`
-   add git remote to heroku `heroku git:remote --app teamspaghetti`

After pushing changes to master branch, run `git push heroku HEAD:master`

## Seeds

-   run `npx prisma db seed` locally

# Create first api route example

-   for create, update or delete an event via backend route, look at example of https://vercel.com/guides/nextjs-prisma-postgres

# Call cron job for testing

-   Productive system:`curl --request POST --url "http://studentenfutter.vercel.app/event/clcudeesb0003q4fwnnj0difb/api/cron" --header "Authorization: Bearer 2702c850-bbab-41ef-aa3a-2dae652aa989"`
-   Local: `curl --request POST --url "http://localhost:3000/api/cron" --header "Authorization: Bearer 2702c850-bbab-41ef-aa3a-2dae652aa989"`

# Format files with Prettier:

-   run `npm run format` to format all files
-   recommended: acivate 'format on save' in vs code settings

# Run Lint:

-   run `npm run lint`

# Naming Conventions

## Git Commits

-   write in present time
-   Start with Capital letter
-   if ticket available, add number at the end e.g. `#123`

## Branches

-   begin with `feature/` or `bugfix/`
-   between words add underlines

## Styled Components

-   begin with `Styled`
-   append with html tag like `Button`

## Comments

-   Comments should only describe why you a specific code and not what the code does

## Functions

-   naming should be self-descriptive
-   camelCase

## Cypress (E2E-Test)

-   npm run cypress
-   add your tests: cypress/e2e
-   for running the tests successfully fill in username,password,id and firstname into `cypress.config.ts`:
