# Happy

### An application developed by **Rocketseat** where you can create and list orphanages to visit and help children whenever you want!

### Features

- React.js
- Node.js
- Typescript
- API Rest
- TypeORM
- Expo
- React native

## How do I start this site?

## Prerequisites

> Need have **npm** installed [Go Here to install](https://nodejs.org/en/)

> Need have **docker** installed [Go Here to install](https://docs.docker.com/desktop/install/windows-install/)

> Need have **git** installed [Go Here to install](https://git-scm.com/downloads)

> Need have **expo-cli** installed [Go Here to install](https://docs.expo.io/)

## Follow theses steps

Open you terminal and run this **commands**:

## To Start Back End

You need a **.env** file with the variables

- API_PORT
- API_URL
- API_FILE_URL
- DATABASE_NAME
- DATABASE_HOST
- DATABASE_USERNAME
- DATABASE_PASSWORD

Open the **server** folder in your terminal and run:

```
npm install
```

After that you need run the **docker compose** to generate a **mysql** to be the database:

```
docker-compose up -d --build
```

You need to generate the typeORM queries using the entities as module (they are in the code) and after that execute the table creation queries in the database.

```
npm run migration:generate

npm run migration:run
```


## To Start Front End (Web)

Open the **web** folder in your terminal and run:

```
cd web

npm install

npm start

```

## To Start Mobile

Open the **mobile** folder in your terminal and run:

```
cd mobile

npm install

npm start

```

You can read the QRcode with **expo** to run the application on your phone or use a emulator.
