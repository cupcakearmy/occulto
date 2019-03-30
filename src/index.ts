import AES  from './AES'
import RSA from './RSA'
//
// (async () => {
//
// 	const text = `lorem ipsums`
// 	const key = `test`
//
// 	// Asymetric
// 	const pair = await RSA.gen()
// 	const ae = RSA.encrypt(text, pair.pub)
// 	console.log(ae)
// 	const ad = RSA.decrypt(ae, pair.prv)
// 	console.log(ad)
//
// 	// Symmetric
// 	const se = AES.encrypt(text, key, AES.Ciphers.AES_256_GCM)
// 	console.log(se)
// 	const sd = AES.decrypt(se, key)
// 	console.log(sd)
//
// })()

export default {
	RSA,
	AES,
}