import knex, { Knex } from "knex"
import knexConfig from "../../knexfile"

export const database: Knex = knex(knexConfig.development)
