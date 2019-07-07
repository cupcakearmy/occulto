import { createHash } from 'crypto'


enum Hashes {
	MD5 = 'md5',
	SHA1_1 = 'sha1',
	SHA1_256 = 'sha256',
	SHA1_512 = 'sha512',
	SHA3_256 = 'sha3-256',
	SHA3_384 = 'sha3-384',
	SHA3_512 = 'sha3-512',
}

export default class Hash {

	static Hashes = Hashes

	/**
	 *
	 * @param {string} plain Input string
	 * @param {Hashes} type Type of hash to be used to digest
	 * @returns {string} Hash of the plain text
	 */
	static digest = (plain: string, type: Hashes = Hashes.SHA3_256): string => createHash(type).update(plain).digest().toString('hex')
}