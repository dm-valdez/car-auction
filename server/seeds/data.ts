import { Knex } from "knex"

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
    await knex('users').insert([
        { id: 1, full_name: 'Richard Forrest', email_address: 'richard@example.com', phone_number: '1234567890', password_hash: 'adminpassword', is_admin: true },
        { id: 2, full_name: 'Addison Tyrell', email_address: 'addison@example.com', phone_number: '9876543210', password_hash: 'userpassword1', is_admin: false },
        { id: 3, full_name: 'Meg Perkins', email_address: 'meg@example.com', phone_number: '2547412589', password_hash: 'userpassword2', is_admin: false },
        { id: 4, full_name: 'Shae Harrison', email_address: 'shae@example.com', phone_number: '7852694253', password_hash: 'userpassword3', is_admin: false },
        { id: 5, full_name: 'Ron Matthews', email_address: 'ron@example.com', phone_number: '4895752169', password_hash: 'userpassword4', is_admin: false },
    ])

    await knex('roles').insert([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'User' },
    ])

    await knex('permissions').insert([
        { id: 1, name: 'CreateAuction', description: 'Allows user to create auctions' },
        { id: 2, name: 'BidOnAuction', description: 'Allows user to bid on auctions' },
        { id: 3, name: 'CloseAuction', description: 'Allows user to close auctions' },
        { id: 4, name: 'DeleteAuction', description: 'Allows user to delete auctions' },
        { id: 5, name: 'ViewAuctionDetails', description: 'Allows user to view auction details' },
    ])

    await knex('user_permissions').insert([
        { user_id: 1, permission_id: 1 },
        { user_id: 1, permission_id: 2 },
        { user_id: 1, permission_id: 3 },
        { user_id: 1, permission_id: 4 },
        { user_id: 1, permission_id: 5 },
        { user_id: 2, permission_id: 1 },
        { user_id: 2, permission_id: 2 },
        { user_id: 2, permission_id: 3 },
        { user_id: 2, permission_id: 5 },
        { user_id: 3, permission_id: 1 },
        { user_id: 3, permission_id: 2 },
        { user_id: 3, permission_id: 3 },
        { user_id: 3, permission_id: 5 },
        { user_id: 4, permission_id: 1 },
        { user_id: 4, permission_id: 2 },
        { user_id: 4, permission_id: 3 },
        { user_id: 4, permission_id: 5 },
        { user_id: 5, permission_id: 1 },
        { user_id: 5, permission_id: 2 },
        { user_id: 5, permission_id: 3 },
        { user_id: 5, permission_id: 5 },
    ])

    await knex('auctions').insert([
        {
            id: 1,
            car_brand: 'Toyota',
            year: 2020,
            type: 'Sedan',
            opening_price: 20000.00,
            price_increment: 1000.00,
            expiry_date: knex.raw('CURRENT_TIMESTAMP + interval \'7 days\''),
            status: 'Open',
            user_id: 1 // Admin User
        },
        {
            id: 2,
            car_brand: 'Honda',
            year: 2018,
            type: 'SUV',
            opening_price: 25000.00,
            price_increment: 1500.00,
            expiry_date: knex.raw('CURRENT_TIMESTAMP + interval \'10 days\''),
            status: 'Open',
            user_id: 2 // Regular User
        },
        {
            id: 3,
            car_brand: 'Toyota',
            year: 2020,
            type: 'Sports',
            opening_price: 27000.00,
            price_increment: 1200.00,
            expiry_date: knex.raw('?', ['2024-04-15']),
            status: 'Open',
            user_id: 3 // Regular User
        },
        {
            id: 4,
            car_brand: 'Ford',
            year: 2019,
            type: 'SUV',
            opening_price: 23000.00,
            price_increment: 1600.00,
            expiry_date: knex.raw('?', ['2024-04-18']),
            status: 'Open',
            user_id: 4 // Regular User
        },
        {
            id: 5,
            car_brand: 'Chevrolet',
            year: 2021,
            type: 'Sedan',
            opening_price: 20000.00,
            price_increment: 1800.00,
            expiry_date: knex.raw('?', ['2024-04-25']),
            status: 'Open',
            user_id: 2 // Regular User
        },
    ])

    await knex('bids').insert([
        {
            id: 1,
            user_id: 2,
            auction_id: 1,
            amount: 21000.00
        },
        {
            id: 2,
            user_id: 3,
            auction_id: 1,
            amount: 22000.00
        },
        {
            id: 3,
            user_id: 3,
            auction_id: 2,
            amount: 20000.00
        },
        {
            id: 4,
            user_id: 4,
            auction_id: 3,
            amount: 29000.00
        }
    ])

    await knex('user_roles').insert([
        { user_id: 1, role_id: 1 }, // Admin User has Admin role
        { user_id: 2, role_id: 2 }, // Regular User has User role
        { user_id: 3, role_id: 2 }, // Regular User has User role
        { user_id: 4, role_id: 2 }, // Regular User has User role
        { user_id: 5, role_id: 2 } // Regular User has User role
    ])

    await knex('role_permissions').insert([
        { role_id: 1, permission_id: 1 }, // Admin role has Create Auction permission
        { role_id: 1, permission_id: 2 },
        { role_id: 1, permission_id: 3 },
        { role_id: 1, permission_id: 4 },
        { role_id: 1, permission_id: 5 },
        { role_id: 2, permission_id: 1 }, // User role has Bid on Auction permission
        { role_id: 2, permission_id: 2 },
        { role_id: 2, permission_id: 3 },
        { role_id: 2, permission_id: 5 }
    ])
}
