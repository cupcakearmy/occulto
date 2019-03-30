import forge from 'node-forge'
import { Base64 } from './Util'

type PrivateKey = string
type PublicKey = string

export type KeyPair = {
	pub: PublicKey
	prv: PrivateKey
}


export default class RSA {

	static gen = (size: number = 2 ** 12): Promise<KeyPair> => new Promise<KeyPair>((resolve, reject) => {
		forge.pki.rsa.generateKeyPair({ bits: size }, function (err, keypair) {
			if (err) reject()
			else resolve({
				pub: forge.pki.publicKeyToPem(keypair.publicKey),
				prv: forge.pki.privateKeyToPem(keypair.privateKey),
			})
		})
	})

	static encrypt(data: string, key: PublicKey): string {
		const obj = forge.pki.publicKeyFromPem(key)
		if (obj instanceof ArrayBuffer) throw new Error()

		return Base64.encode(obj.encrypt(data))
	}

	static decrypt(data: string, key: PrivateKey): string {
		const obj = forge.pki.privateKeyFromPem(key)
		if (obj instanceof ArrayBuffer) throw new Error()

		return obj.decrypt(Base64.decode(data))
	}

}