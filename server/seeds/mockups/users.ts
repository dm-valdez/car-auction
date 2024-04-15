import { generatePasswordHash } from '../../src/utils/generatePasswordHash'
import { randomBytes } from 'node:crypto'

export const USERS = [
  {
    id: 1,
    full_name: 'Richard Forrest',
    email_address: 'richard@example.com',
    phone_number: '1234567890',
    password_salt: 'adminpassword',
    password_hash: 'adminpassword',
    is_admin: true,
  },
  {
    id: 2,
    full_name: 'Addison Tyrell',
    email_address: 'addison@example.com',
    phone_number: '9876543210',
    password_salt: 'userpassword1',
    password_hash: 'userpassword1',
    is_admin: false,
  },
  {
    id: 3,
    full_name: 'Meg Perkins',
    email_address: 'meg@example.com',
    phone_number: '2547412589',
    password_salt: 'userpassword2',
    password_hash: 'userpassword2',
    is_admin: false,
  },
  {
    id: 4,
    full_name: 'Shae Harrison',
    email_address: 'shae@example.com',
    phone_number: '7852694253',
    password_salt: 'userpassword3',
    password_hash: 'userpassword3',
    is_admin: false,
  },
  {
    id: 5,
    full_name: 'Ron Matthews',
    email_address: 'ron@example.com',
    phone_number: '4895752169',
    password_salt: 'userpassword4',
    password_hash: 'userpassword4',
    is_admin: false,
  },
]


export const USER_PERMISSIONS = [
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
]

export const USER_ROLES = [
  { user_id: 1, role_id: 1 },
  { user_id: 2, role_id: 2 },
  { user_id: 3, role_id: 2 },
  { user_id: 4, role_id: 2 },
  { user_id: 5, role_id: 2 },
]


async function generatePasswordForUsers() {
  for (let user of USERS) {
    const salt = randomBytes(16).toString('hex')
    const hashedPassword = await generatePasswordHash('user123', salt)
    user.password_salt = salt
    user.password_hash = hashedPassword
  }
}

generatePasswordForUsers()
  .then(() => {
    console.log(USERS)
  })
  .catch(err => {
    console.error('Error generating password for users:', err)
  })
