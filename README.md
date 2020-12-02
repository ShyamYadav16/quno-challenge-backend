## Quno Backend Code Challenge

##### Requirement:

Design and implement web API that receives requests from the frontend clients to query for doctors in the system and to create new doctors.

## Tech Stack

      1. Node.JS
      2. Typescript
      3. Serverless
      4. Inversify
      5. PostgresSQL
      6. Openapi
      7. Jest
      8. docker-compose
      9. db-migrate
      
## How to Run and Build

1. Install and execute [Docker](https://www.docker.com/)
2. Run `yarn install` on the root of the project folder to install the dependencies.
3. Run `docker-compose` on the root of the project to start the database.
4. Run the migrations by executing `yarn db:migration up` (you can rollback the migration by running `yarn db:migration down`).
5. Run `yarn dev` to start the server

The table `doctor` and some data will automatically be imported as soon as you run the command `yarn db:migration up`  

## How to Run test


To run test, just execute:

```yarn test```

**Note:** Covered unit test for POST /doctors endpoint as expected and also the service layer.


## Architecture

Fully based on onion architecture and good practices.

This project is using:

1. **_Inversify_**, that encourages the usage of OOPs concept, IOC and dependency injection.
2. **_Builder design Pattern_**, that helps to separate object creation and functionality from service layer.
3. **_ts-postgres_**, since the challenge was about writing and reading data within 300ms, I decided not to use orm library for db connection. 
I tested read/write operation with TypeORM and it was taking 700ms to 1000ms to return response, with ts-postgres I was able to achieve getting response within 300ms.
4. **_PostgresSQL_**, I have used the existing docker-compose which had PostgresSQL image and also the db migration which was given to me with the boiler-plate and made some necessary changes.         
5. **_Openapi_**, I have used SwaggerHub to generate the Openapi.yml for API documentation, since we can connect our API definitions in SwaggerHub to API Gateway by using the Amazon API Gateway integration.


## API Documentation

Please click on [Swagger editor](https://editor.swagger.io/ "API Doc") and import the file openapi.yml to view the documentation and test the API.

**Note:** The API is protected by an API key, please use **x-api-key** header with the uuid **210121af-3f36-4191-bfbd-e82a563aa385** to authorize requests.

## RESTful API

* /doctors      -X HTTP GET (To get doctors).
* /doctors/{id} -X HTTP GET (To get doctor by id).
* /doctors      -X HTTP POST (To add doctor).

## Other ways to Test API

##### Curl

* /doctors -X HTTP GET (To get doctors).

```
curl -X GET 
"http://localhost:4000/doctors?limit=10&offset=0&orderBy=name&isAsc=1" 
-H  "accept: application/json" 
-H  "x-api-key: 210121af-3f36-4191-bfbd-e82a563aa385"
```

* /doctors/{id} -X HTTP GET (To get doctor by id).

```
curl -X GET 
"http://localhost:4000/doctors/1" 
-H  "accept: application/json" 
-H  "x-api-key: 210121af-3f36-4191-bfbd-e82a563aa385"
``` 

* /doctors -X HTTP POST (To add doctor).

```
curl -X POST 
"http://localhost:4000/doctors" 
-H  "accept: */*" 
-H  "x-api-key: 210121af-3f36-4191-bfbd-e82a563aa385" 
-H  "Content-Type: application/json" 
-d "{\"name\":\"Dr. abc xyz\",\"city\":\"Berlin\",\"country\":\"Germany\",\"avatarUrl\":\"http://abc.com\",\"qunoScoreNumber\":8.5,\"ratingsAverage\":4.2,\"treatmentsLastYear\":2000,\"yearsExperience\":15,\"basePrice\":1255.25}"
```