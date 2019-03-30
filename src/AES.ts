import forge from 'node-forge'

export enum Ciphers {
	AES_256_GCM,
	AES_192_GCM,
	AES_128_GCM,
	AES_256_CTR,
	AES_192_CTR,
	AES_128_CTR,
	AES_256_CBC,
	AES_192_CBC,
	AES_128_CBC,
}

type CipherConfig = {
	alg: forge.cipher.Algorithm,
	saltSize: number
	keySize: number
	tagSize: number
	it: number
}

type EncryptedItem = {
	alg: forge.cipher.Algorithm,
	data: string,
	keySize: number,
	iv: string,
	it: number
	salt: string,
	tag: string,
	tagSize: number,
}

export default class AES {

	static Ciphers = Ciphers

	static encrypt(data: string, key: string, type: Ciphers = Ciphers.AES_256_GCM): string {
		const { alg, it, keySize, saltSize, tagSize } = AES.getCipherConfig(type)
		const salt = forge.random.getBytesSync(saltSize)
		const iv = forge.random.getBytesSync(keySize)

		const cipher = forge.cipher.createCipher(
			alg,
			forge.pkcs5.pbkdf2(key, salt, it, keySize),
		)

		cipher.start({
			iv,
			tagLength: tagSize,
		})
		cipher.update(forge.util.createBuffer(data))
		cipher.finish()

		const encrypted: EncryptedItem = {
			alg,
			data: forge.util.hexToBytes(cipher.output.toHex()),
			keySize,
			iv,
			it,
			salt,
			tag: forge.util.hexToBytes(cipher.mode.tag.toHex()),
			tagSize,
		}

		return Buffer.from(JSON.stringify(encrypted)).toString('base64')
	}

	static decrypt(e: string, key: string): string {
		const { alg, data, keySize, iv, it, salt, tag, tagSize }: EncryptedItem = JSON.parse(Buffer.from(e, 'base64').toString())

		const cipher = forge.cipher.createCipher(
			alg,
			forge.pkcs5.pbkdf2(key, salt, it, keySize),
		)

		cipher.start({
			iv,
			tag: new forge.util.ByteStringBuffer(tag),
			tagLength: tagSize,
		})
		cipher.update(new forge.util.ByteStringBuffer(data))
		cipher.finish()

		return cipher.output.toString()
	}

	private static getCipherConfig = (type: Ciphers): CipherConfig => {
		switch (type) {
			case Ciphers.AES_128_GCM:
				return {
					alg: 'AES-GCM',
					saltSize: 128,
					keySize: 16,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_192_GCM:
				return {
					alg: 'AES-GCM',
					saltSize: 128,
					keySize: 24,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_256_GCM:
				return {
					alg: 'AES-GCM',
					saltSize: 128,
					keySize: 32,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_128_CBC:
				return {
					alg: 'AES-CBC',
					saltSize: 128,
					keySize: 16,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_192_CBC:
				return {
					alg: 'AES-CBC',
					saltSize: 128,
					keySize: 24,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_256_CBC:
				return {
					alg: 'AES-CBC',
					saltSize: 128,
					keySize: 32,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_128_CTR:
				return {
					alg: 'AES-CTR',
					saltSize: 128,
					keySize: 16,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_192_CTR:
				return {
					alg: 'AES-CTR',
					saltSize: 128,
					keySize: 24,
					tagSize: 128,
					it: 2 ** 12,
				}
			case Ciphers.AES_256_CTR:
				return {
					alg: 'AES-CTR',
					saltSize: 128,
					keySize: 32,
					tagSize: 128,
					it: 2 ** 12,
				}
		}
	}
}