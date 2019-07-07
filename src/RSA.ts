import { generateKeyPair, privateDecrypt, publicEncrypt } from 'crypto'

type PrivateKey = string
type PublicKey = string

export type KeyPair = {
	pub: PublicKey
	prv: PrivateKey
}


export default class RSA {

	/**
	 *
	 * @param {number} size Number of bits for the key
	 * @returns {Promise<KeyPair>} Object that contains the key pair
	 */
	static gen = (size: number = 2 ** 12): Promise<KeyPair> => new Promise<KeyPair>((resolve, reject) => {
		// @ts-ignore
		generateKeyPair('rsa', {
			modulusLength: size,
			publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
			privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
		}, (err: string, pub: string, prv: string) => {
			if (err) reject()
			else resolve({
				pub,
				prv,
			})
		})
	})

	/**
	 *
	 * @param {string} plain
	 * @param {PublicKey} key
	 * @returns {string} Encrypted string
	 */
	static encrypt = (plain: string, key: PublicKey): string => publicEncrypt(key, Buffer.from(plain)).toString('base64')

	/**
	 *
	 * @param {string} encrypted
	 * @param {PrivateKey} key
	 * @returns {string} Decrypted string
	 */
	static decrypt = (encrypted: string, key: PrivateKey): string => privateDecrypt(key, Buffer.from(encrypted, 'base64')).toString()

}