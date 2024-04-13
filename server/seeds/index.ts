import { Knex } from "knex"
import { USER_PERMISSIONS, USER_ROLES, USERS } from "./mockups/users"
import { AUCTIONS } from "./mockups/auctions"
import { BIDS } from "./mockups/bids"
import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from "./mockups/rolesPermissions"

exports.seed = async function (knex: Knex){
    // Deletes ALL existing entries
    await knex('user_permissions').del();
    await knex('role_permissions').del();
    await knex('user_roles').del();
    await knex('bids').del();
    await knex('auctions').del();
    await knex('permissions').del();
    await knex('roles').del();
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert(USERS)
    await knex('roles').insert(ROLES)
    await knex('permissions').insert(PERMISSIONS)
    await knex('user_permissions').insert(USER_PERMISSIONS)
    await knex('auctions').insert(AUCTIONS)
    await knex('bids').insert(BIDS)
    await knex('user_roles').insert(USER_ROLES)
    await knex('role_permissions').insert(ROLE_PERMISSIONS)
}
