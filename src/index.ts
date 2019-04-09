import RSA_Internal from './RSA'
import Symmetric_Internal from './Symmetric'

export const RSA = RSA_Internal
export const Symmetric = Symmetric_Internal


export default {
	RSA,
	Symmetric,
}

// Require node 11
if (parseInt(process.versions.node.split('.')[0]) < 10) throw new Error('Node 10 or higher is required')