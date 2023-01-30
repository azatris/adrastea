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
npx prisma generate && npx prisma migrate dev --name init
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

### Limitations
If the BoredAPI does not return us a result with our wished parameters, we will query for a random activity instead.


This situation could be eased by using fewer parameters for that query, but that would only work with a very few parameters (we'd have to retry for different combinations of these parameters),
so it would not be a maintainable solution long-term if we want to add any parameters in the future. 


### Easter egg
Look for the Easter egg.

### Database
Could use any other database by changing the datasource in prisma/schema.prisma, e.g. by changing the provider to postgresql. This db server in turn could be
launched via a docker container.


## Future work

### Dependency injection
Should there be more services in the future, dependency injection should be used.

### Form validation
On increased complexity of the app, form validation should be added via a library such as Formik and Yup.

### Package management
Could use a build system such as Lerna or NX.dev for monorepo support to manage the client and server side better.

### Testing
Could use Jest for testing. This should be done once we have a better understanding of this app's user base and their requirements, so we can test these pathways thoroughly. 
Until then this app is more of a prototype.


