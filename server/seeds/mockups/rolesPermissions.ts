export const ROLES = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
]

export const PERMISSIONS = [
    { id: 1, name: 'CreateAuction', description: 'Allows user to create auctions' },
    { id: 2, name: 'BidOnAuction', description: 'Allows user to bid on auctions' },
    { id: 3, name: 'CloseAuction', description: 'Allows user to close auctions' },
    { id: 4, name: 'DeleteAuction', description: 'Allows user to delete auctions' },
    { id: 5, name: 'ViewAuctionDetails', description: 'Allows user to view auction details' },
]

export const ROLE_PERMISSIONS = [
    { role_id: 1, permission_id: 1 }, // Admin role has Create Auction permission
    { role_id: 1, permission_id: 2 },
    { role_id: 1, permission_id: 3 },
    { role_id: 1, permission_id: 4 },
    { role_id: 1, permission_id: 5 },
    { role_id: 2, permission_id: 1 }, // User role has Bid on Auction permission
    { role_id: 2, permission_id: 2 },
    { role_id: 2, permission_id: 3 },
    { role_id: 2, permission_id: 5 }
]
