import { randomBytes } from 'crypto'

export class Base64 {
	static encode = (s: string): string => Buffer.from(s).toString('base64')
	static decode = (s: string): string => Buffer.from(s, 'base64').toString()
}


function Rand(length: number, string: false): Buffer
function Rand(length: number, string: true): string
function Rand(length: number, string: boolean = false): Buffer | string {
	const r = randomBytes(length)
	return string
		? r.toString('ascii')
		: r
}

export default {
	Rand
}