import {
	Cipher,
	CipherCCM,
	CipherGCM,
	createCipheriv,
	createDecipheriv,
	Decipher,
	DecipherCCM,
	DecipherGCM,
	randomBytes,
	scryptSync,
} from 'crypto'
import { TransformOptions } from 'stream'

import { Base64 } from './Util'

export enum Ciphers {
	ChaCha20,
	AES_256_GCM,
	AES_192_GCM,
	AES_128_GCM,
	AES_256_CTR,
	AES_192_CTR,
	AES_128_CTR,
}

type CipherConfig = {
	alg: string,
	keySize: number,
	ivSize: number
	mac?: number
}

type EncryptedItem = {
	alg: string,
	data: string,
	iv: string,
	salt: string
	keySize: number,
	tag?: string,
	tagSize?: number
}

export default class Symmetric {

	static Ciphers = Ciphers
	static Encoding: BufferEncoding = 'base64'

	static encrypt(data: string, pass: string, type: Ciphers = Ciphers.AES_256_CTR): string {
		const { alg, ivSize, mac, keySize } = Symmetric.getCipherConfig(type)

		const iv = randomBytes(ivSize)
		const salt = randomBytes(keySize)
		const key = scryptSync(pass, salt, keySize)

		// @ts-ignore
		const options: TransformOptions = mac ? { authTagLength: mac } : undefined
		const cipher: CipherGCM | CipherCCM | Cipher = createCipheriv(alg, key, iv, options)
		let content: Buffer = Buffer.concat([
			cipher.update(data),
			cipher.final(),
		])

		let tag: string | undefined = undefined
		// @ts-ignore
		if (mac) tag = cipher.getAuthTag().toString(Symmetric.Encoding)

		const encrypted: EncryptedItem = {
			alg,
			data: content.toString(Symmetric.Encoding),
			tag,
			iv: iv.toString(Symmetric.Encoding),
			salt: salt.toString(Symmetric.Encoding),
			keySize,
			tagSize: mac,
		}

		return Base64.encode(JSON.stringify(encrypted))
	}

	static decrypt(e: string, pass: string): string {
		const { alg, data, iv, tag, salt, keySize, tagSize }: EncryptedItem = JSON.parse(Base64.decode(e))
		const key = scryptSync(pass, Buffer.from(salt, Symmetric.Encoding), keySize)

		// @ts-ignore
		const options: TransformOptions = tag ? { authTagLength: tagSize } : undefined
		const decipher: DecipherGCM | DecipherCCM | Decipher = createDecipheriv(alg, key, Buffer.from(iv, Symmetric.Encoding), options)

		// @ts-ignore
		if (tag) decipher.setAuthTag(Buffer.from(tag, Symmetric.Encoding))

		const decrypted: Buffer = Buffer.concat([
			decipher.update(Buffer.from(data, Symmetric.Encoding)),
			decipher.final(),
		])

		return decrypted.toString()
	}

	private static getCipherConfig = (type: Ciphers): CipherConfig => {
		switch (type) {
			case Ciphers.AES_128_GCM:
				return {
					alg: 'aes-128-gcm',
					ivSize: 16,
					keySize: 16,
					mac: 16,
				}
			case Ciphers.AES_192_GCM:
				return {
					alg: 'aes-192-gcm',
					ivSize: 16,
					keySize: 24,
					mac: 16,
				}
			case Ciphers.AES_256_GCM:
				return {
					alg: 'aes-256-gcm',
					ivSize: 16,
					keySize: 32,
					mac: 16,
				}
			case Ciphers.AES_128_CTR:
				return {
					alg: 'aes-128-ctr',
					ivSize: 16,
					keySize: 16,
				}
			case Ciphers.AES_192_CTR:
				return {
					alg: 'aes-192-ctr',
					ivSize: 16,
					keySize: 24,
				}
			case Ciphers.AES_256_CTR:
				return {
					alg: 'aes-256-ctr',
					ivSize: 16,
					keySize: 32,
				}
			case Ciphers.ChaCha20:
				return {
					alg: 'chacha20',
					ivSize: 16,
					keySize: 32,
				}
		}
	}
}