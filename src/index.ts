import RSA from './RSA'
import Symmetric from './Symmetric'

const exp = {
	RSA,
	Symmetric,
}

module.exports = {
	...exp,
	default: exp,
}