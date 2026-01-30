# NC News Seeding

This project uses environment variables that are not committed.
You must create the required .env files manually in order to run the project locally.

Create the following file in the root of the project:
.env.test (for the test database).
.env.development (for the development database).

Run npm run setup-dbs to create your database. Inside the .env files add PGDATABASE = nc_news

ERC
https://lucid.app/lucidchart/483b97ec-fbfc-4d07-a4e4-54ea1bd3705b/edit?viewport_loc=-1449%2C-596%2C2519%2C1685%2C0_0&invitationId=inv_6fbdd21b-53d1-48dd-97c7-ca2571813de0
