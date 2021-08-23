# Open WMS Backend

![test-coverage](https://i.pinimg.com/564x/63/d2/93/63d293b972479811b7ccf45efdc05f52.jpg)
## Summary

This project was thought and developed for the Rocketseat hackathon.

My team is developing a WMS(Warehouse management system) free of charge for the public, where anybody could be a user and control their business warehouse. We intend to help people without conditions to buy a WMS.

## Technologies
- Javascript
- Typescript
- Docker(DB image and app instance)
- Jest (Tests)
- TypeORM
- Swagger/SwaggerUI (Docs)
- Postgres (DB)


## Instalação & Execução

You will need of **npm/yarn**, **nodejs**, **docker** and **docker-compose** to run our backend.

Install the dependencies with:

```shell
yarn OR npm install
```

We have a file on the root folder called **"ormconfig.example.json"**. This file contains the database configurations, and you need to copy your content and create another file **"ormconfig.json"**. Also, we have a file **".env.example"**, where you must need to copy all content and paste it on a new file **".env"**. (Both files already have default values to be necessary to run the project, edit if you need)


After that, run the command below to update the database with migrations:

```shell
yarn typeorm migration:run
```

As mentioned above, we use docker-compose to be responsible for running our application, together with the database.
to run our docker-compose:

```shell
docker-compose up -d
```

After finish the installation, the URL of the project will be available on **http://localhost:3333**.
Verify if this port is available.

You can observe the logs of the backend with the command below:

```shell
docker logs hacka_wms -f 
```

We created a route to check if the application is online. You can check that with a **GET on http://localhost:3333/ping**

Our application also has documentation with all your features, and it's available on **http://localhost:3333/api_docs**.

**OBS:** The docker-compose will install an instance of Postgres on port **5432**. If this port is already in use, maybe you will have any problems. Make sure that this port is available. 

**OBS 2:** Our backend creates a second server express on port **3332**. This server is responsible for notifying users about products with short days and low volume, running cronjobs. Check if this port is available too. 

**OBS 3:** By default, the application will send the emails in development mode([ethereal](https://ethereal.email/)). You can see the logs of the emails sent. In case you desire to use AWS will be necessary to set your credentials on `.env`. We make it available by default on `.env.example`.

## Tests

Our application has **unit tests**([jest](https://jestjs.io)) and **e2e tests**([supertest](https://github.com/visionmedia/supertest#readme)), for the main functionalities.

For run tests, **make sure that you create a database called "hacka_wms_tests"**

After that, run the command below:

```shell
yarn test OU npm run test
```
