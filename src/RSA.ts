import { generateKeyPair, privateDecrypt, publicEncrypt } from 'crypto'

type PrivateKey = string
type PublicKey = string

export type KeyPair = {
	pub: PublicKey
	prv: PrivateKey
}


export default class RSA {

	static gen = (size: number = 2 ** 12): Promise<KeyPair> => new Promise<KeyPair>((resolve, reject) => {
		// @ts-ignore
		generateKeyPair('rsa', {
			modulusLength: 4096,
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

	static encrypt = (data: string, key: PublicKey): string => publicEncrypt(key, Buffer.from(data)).toString('base64')

	static decrypt = (data: string, key: PrivateKey): string => privateDecrypt(key, Buffer.from(data, 'base64')).toString()

}