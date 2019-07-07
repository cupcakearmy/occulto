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

	/**
	 *
	 * @param plain {string} data The data to be encrypted
	 * @param key {string} The encryption key
	 * @param type {Ciphers} [type=Ciphers.AES_256_CTR]    The cipher that will be used
	 * @returns {string} Encrypted data as string
	 */
	static encrypt(plain: string, key: string, type: Ciphers = Ciphers.AES_256_CTR): string {
		const { alg, ivSize, mac, keySize } = Symmetric.getCipherConfig(type)

		const iv = randomBytes(ivSize)
		const salt = randomBytes(keySize)
		const keyBuffered = scryptSync(Buffer.from(key), salt, keySize)


		const options: TransformOptions | undefined = mac ? { authTagLength: mac } as TransformOptions : undefined
		const cipher: CipherGCM | CipherCCM | Cipher = createCipheriv(alg, keyBuffered, iv, options)
		let content: Buffer = Buffer.concat([
			cipher.update(Buffer.from(plain)),
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

	/**
	 *
	 * @param {string} encrypted The encrypted string
	 * @param {string} key The key used for encrypting
	 * @returns {string} The data as string
	 */
	static decrypt(encrypted: string, key: string): string {
		const { alg, data, iv, tag, salt, keySize, tagSize }: EncryptedItem = JSON.parse(Base64.decode(encrypted))
		const keyBuffered = scryptSync(Buffer.from(key), Buffer.from(salt, Symmetric.Encoding), keySize)

		// @ts-ignore
		const options: TransformOptions = tag ? { authTagLength: tagSize } : undefined
		const decipher: DecipherGCM | DecipherCCM | Decipher = createDecipheriv(alg, keyBuffered, Buffer.from(iv, Symmetric.Encoding), options)

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