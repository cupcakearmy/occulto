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

// Require node 11
if(parseInt(process.versions.node.split('.')[0]) < 10) throw new Error('Node 10 or higher is required')