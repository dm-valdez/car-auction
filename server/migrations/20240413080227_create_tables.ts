import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary()
            table.string('full_name', 255)
            table.string('email_address', 255)
            table.string('phone_number', 20)
            table.string('password_hash', 255)
            table.boolean('is_admin').defaultTo(false)
        })
        .createTable('roles', function(table) {
            table.increments('id').primary()
            table.string('name', 50)
        })
        .createTable('permissions', function(table) {
            table.increments('id').primary()
            table.string('name', 50)
            table.string('description', 255)
        })
        .createTable('auctions', function(table) {
            table.increments('id').primary()
            table.string('car_brand', 100)
            table.integer('year')
            table.string('type', 100)
            table.decimal('opening_price', 10, 2)
            table.decimal('price_increment', 10, 2)
            table.date('expiry_date')
            table.string('status', 20)
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.timestamps(true, true)
        })
        .createTable('bids', function(table) {
            table.increments('id').primary()
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.integer('auction_id').unsigned().references('id').inTable('auctions').onDelete('CASCADE')
            table.decimal('amount', 10, 2)
            table.timestamps( true, true)
        })
        .createTable('user_roles', function(table) {
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
            table.primary(['user_id', 'role_id'])
        })
        .createTable('role_permissions', function(table) {
            table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
            table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('CASCADE')
            table.primary(['role_id', 'permission_id'])
        })
        .createTable('user_permissions', function(table) {
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('CASCADE')
            table.primary(['user_id', 'permission_id'])
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('user_permissions')
        .dropTableIfExists('role_permissions')
        .dropTableIfExists('user_roles')
        .dropTableIfExists('bids')
        .dropTableIfExists('auctions')
        .dropTableIfExists('permissions')
        .dropTableIfExists('roles')
        .dropTableIfExists('users')
}

