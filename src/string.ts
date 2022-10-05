import { customAlphabet } from 'nanoid'

/**
 * generate random string depends on parameter alphabet
 * @param length
 * @param alphabet
 * @returns
 */
export function randomString(
	length = 16,
	alphabet = '0123456789abcdefghijklmnopqrstuvwxyz',
	dashSeperator = true
) {
	// default params generate: pdlerqxd1rc-67k5
	const nanoid = customAlphabet(alphabet, length)
	let rs = nanoid()

	if (length > 7 && dashSeperator) {
		const tailStartIdx = rs.length - 4
		return `${rs.substring(0, tailStartIdx)}-${rs.substring(tailStartIdx)}`
	} else {
		return rs
	}
}

export function randomSerial(
	length = 6,
	alphabet = '0123456789abcdef',
	dashSeperator = true
) {
	const nanoid = customAlphabet(alphabet, length)
	let serial = nanoid()

	if (length > 7 && dashSeperator) {
		const suffixStartIdx = serial.length - 4
		return `${serial.substring(0, suffixStartIdx)}-${serial.substring(
			suffixStartIdx - 1
		)}`
	} else {
		return serial
	}
}

console.log('randomString', randomString(7))
console.log('randomString', randomString(8))
console.log('randomSerial', randomSerial(7))
console.log('randomSerial', randomSerial(8))
