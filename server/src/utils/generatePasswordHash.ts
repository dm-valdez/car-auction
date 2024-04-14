import { pbkdf2 } from "node:crypto"

export async function generatePasswordHash(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err)
            else resolve(derivedKey.toString('hex'))
        })
    })
}
