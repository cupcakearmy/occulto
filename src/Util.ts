export class Base64 {
	static encode = (s: string): string => Buffer.from(s).toString('base64')
	static decode = (s: string): string => Buffer.from(s, 'base64').toString()
}