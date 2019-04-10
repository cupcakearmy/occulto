import H from './Hash'
import R from './RSA'
import S from './Symmetric'
import U from './Util'

export const RSA = R
export const Symmetric = S
export const Hash = H
export const Util = U


export default {
	RSA,
	Symmetric,
	Hash,
	Util,
}

// Require node 11
if (parseInt(process.versions.node.split('.')[0]) < 11) throw new Error('Node 11 or higher is required')