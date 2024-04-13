import { Knex } from "knex"

const { POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

interface KnexConfig {
    [key: string]: Knex.Config
}

const knexConfig: KnexConfig = {
    development: {
        client: 'postgresql',
        connection: {
            host: POSTGRES_HOST,
            database: POSTGRES_DATABASE,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        },
        migrations: {
            directory: './migrations'
        }
    }
};

export default knexConfig
