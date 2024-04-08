<div align="center">
    <h1> Sample NodeJS REST API 🌈🌞 </h1>
    <p>This Project Built form Sample project that using NodeJs [es6] with Postgres SQL</p>
</div>

## My Github stats 〽️

<br>

<div align="center" style="max-width: 500px; margin-left: auto; margin-right: auto;">
    <img align="" width="99.9%" src="https://github-readme-activity-graph.vercel.app/graph?username=pphatdev&bg_color=ffffff00&color=298f1d&line=1f8f00&point=248f12&area=true&hide_border=true&hide_title=true" />
</div>



## Clone the project 📂

```sh
git clone https://github.com/pphatdev/apis-with-nodejs-es6.git
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
🚀 Host Service: http://172.26.17.136:3000

🌞  API development:
🚀 Localhost: http://localhost:3000/api/v1/
🚀 Local Service: http://127.0.0.1:3000/api/v1/
🚀 Host Service: http://172.26.17.136:3000/api/v1/
```
