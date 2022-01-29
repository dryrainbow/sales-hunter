import {ConnectionOptions} from "typeorm";

const options:ConnectionOptions[] = [{
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  "port": Number(process.env.DATABASE_PORT),
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/migration"
  }
},
  {
    name: 'seed',
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": Number(process.env.DATABASE_PORT),
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": true,
    "logging": false,
    migrations: [
      'src/seeds/*.ts'
    ],
    cli: {
      migrationsDir: './src/seeds',
    }
  }
]

export default options
