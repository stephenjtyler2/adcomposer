
# Database

This project uses PostgresSQL and Prisma ORM.

Prisma cli reads from sys env vars for its cli functions like migrate (to apply db schema changes).   To do this use dotenv-cli to execute in that context.

npm install -g dotenv cli

dotenv -e .env.development.local -- npx prisma migrate dev -- name init