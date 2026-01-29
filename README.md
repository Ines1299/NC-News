# NC News Seeding

This project uses environment variables that are not committed.
You must create the required .env files manually in order to run the project locally.

Create the following file in the root of the project:
.env.test (for the test database).
.env.development (for the development database).

Run npm run setup-dbs to create your database. Inside the .env files add PGDATABASE = nc_news
