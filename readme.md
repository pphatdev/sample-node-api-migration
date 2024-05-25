<div align="center">
    <h1> Sample NodeJS REST API 🌈🌞 </h1>
    <p>This Project Built form Sample project that using NodeJs [es6] with Postgres SQL</p>
</div>

## Project Structure 📂

### Project Sources
Control the APIs
```sh
src
├───controllers
├───db
│   └───configs
├───helpers
├───middlewares
├───models
└───apis
```

### Project CLI Built-in
Command-line built-in
```sh
├───commands
│   ├───cli
│   ├───controllers
│   ├───models
│   ├───routes
│   ├───sql
│   └───stub
├───migrations
│   └───sql
└───src
```

## Clone the project 📂

```sh
git clone https://github.com/pphatdev/sample-node-api-migration.git
```

```sh
cd ./apis-with-nodejs-es6
```

## To Start Project ♻️

### Config Database ⚙️

make sure your database local is working. copy `.env.exmaple` to `.env` than change the env configuration.

> If you skip this step you can't start the node service.

```env
# App Enviroment
VERSION="v1"
APP_NAME="REST APIs with NodeJs"
NODE_ENV="development"

# DB Connection
DB_HOST="your host"
DB_NAME="your database name"
DB_PORT="your PORT"
DB_USER="your username"
DB_PWD="your password"
```

```sh
cp .env.example .env
```

```sh
npm install
```

### Database Migration 🚀🛩️

You can create multi table

#### Signle table 1️⃣🥰

```sh
npm run db:create table_name
```

#### Multi tables 🔢🥰

```sh
npm run db:create table_name1 table_name2
```
After Creating sql file you have to update the sql to your own table.

```sh
cd ./migrations/sql
```

### Migrate table to Database 〽️

```sh
npm run db:migrate
```

### Starting Server 〽️

Finally you can start the project.

```sh
npm start
```

and these what you see on terminal! 😎

```bash
♻️  Starting with: [development] Mode!

🌞  Web development:
🚀 Localhost: http://localhost:3000
🚀 Local Service: http://127.0.0.1:3000
🚀 Host Service: http://{ipv4}:3000

🌞  API development:
🚀 Localhost: http://localhost:3000/api/v1/
🚀 Local Service: http://127.0.0.1:3000/api/v1/
🚀 Host Service: http://{ipv4}:3000/api/v1/
```

## Usage 🧭⚡
In this project you can create routes, controllers, and models by cli. How to do that please check documentation below.

### Create Routes 📂
```bash
npm run create:route routename1, routename2
```

### Create Controllers 📂
```bash
npm run create:controller controllername1, controllername2
```

### Create Controllers 📂
```bash
npm run create:controller controllername1, controllername2
```

### Create Models 😎
```bash
npm run create:model modelname1, modelname2
```

### Create Route, Controller, and Model

You can create route, controller, and model by signle command.

```bash
npm run create:rcm rcmname
```

## Bug Report

[Help me to Improve](https://github.com/pphatdev/sample-node-api-migration/discussions/new?category=general)
