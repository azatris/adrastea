# Generate Activity App

<img src="https://i.imgur.com/I8L3hB3.png" alt="Visualization of Generate Activity App">


This project is created for the purpose of solving a take-home assignment for a job application.

Because this project has heavy reliance on BoredAPI, it should not be attempted to be run without an internet connection.
Also, that API is a hard dependency and must be available for the project to run.



## To run

Begin with

``
npm install
``


### Database
Create local db with Prisma (already done by postinstall hook if you ran npm install)

``
npx prisma generate
``

In order to see the db

``
npx prisma studio
``

### Server

In another tab, start the server

``
npm run start
``

### Client

In another tab, start the client

``
cd client
``

``
npm install
``

``
npm run start
``


## Notes

Look for the Easter egg.

## Future work

### Dependency injection
Should there be more services in the future, dependency injection should be used.

