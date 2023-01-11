# Setup with starter (Kerstin already did that)

- https://vercel.com/guides/nextjs-prisma-postgres

# Run Project

- create .env file and add database url from heroku postgresql credentials
  DATABASE_URL=....
- run `npm install`
- then run `npm run dev`

# DB schema

- in /prisma/schema.prisma we will define our database models
- already started with user and events (not completed yet)
- after updating schema we must run `npx prisma db push` to push db changes
- run `npx prisma studio` to add new data to database (currently users and events)

- For docomentation (CRUD, migrations...) visit https://www.prisma.io/docs/concepts/components/prisma-client

## Migrations

`prisma migrate dev` for local migrations

- add field to schema.prisma and run `npx prisma migrate dev --name added_defined_fields_to_event`
- for migrations in production login in terminal to heroku `heroku login`

# Create first api route example

- for create, update or delete a event via backend route, look at example of https://vercel.com/guides/nextjs-prisma-postgres
