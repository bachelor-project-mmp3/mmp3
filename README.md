# Setup with starter (Kerstin already did that)

- https://vercel.com/guides/nextjs-prisma-postgres

# Run Project

- create .env file with following variables
  DATABASE_URL=.... (your local postgresql database)
  CLIENT_ID=....
  CLIENT_SECRET=....
  NEXTAUTH_URL="http://localhost:3000/"
  NEXTAUTH_SECRET=....
- run `npm install`
- then run `npm run dev`

# DB schema

- in /prisma/schema.prisma we will define our database models
- run `npx prisma studio` to add new data to database (currently users and events)

- For docomentation (CRUD, migrations...) visit https://www.prisma.io/docs/concepts/components/prisma-client

## Migrations

`npx prisma migrate dev` for local migrations

- add field to schema.prisma and run `npx prisma migrate dev --name added_defined_fields_to_event`

### Production migrations

First setup Heroku connection:

- for migrations in production login in terminal to heroku `heroku login`
- add git remote to heroku `heroku git:remote --app teamspaghetti`

After pushing changes to main branch, run `git push heroku HEAD:master`

## Seeds

- run `npx prisma db seed` locally

# Create first api route example

- for create, update or delete a event via backend route, look at example of https://vercel.com/guides/nextjs-prisma-postgres