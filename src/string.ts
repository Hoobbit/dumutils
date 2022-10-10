import { customAlphabet } from 'nanoid'

/**
 * generate random string depends on parameter alphabet
 * @param length
 * @param alphabet
 * @param dashSeperator
 * @returns
 */
export function randomString(
	length = 16,
	alphabet = '0123456789abcdefghijklmnopqrstuvwxyz',
	dashSeperator = true
): string {
	// default params generate: pdlerqxd1rc-67k5
	const nanoid = customAlphabet(alphabet, length)
	let rs = nanoid()

	if (length > 8 && dashSeperator) {
		const tailStartIdx = rs.length - 5
		return `${rs.substring(0, tailStartIdx)}-${rs.substring(
			tailStartIdx,
			length - 1
		)}`
	} else {
		return rs
	}
}

/**
 *
 * @param length
 * @param alphabet
 * @param dashSeperator
 * @returns
 */
export function randomSerial(
	length = 6,
	alphabet = '0123456789abcdef',
	dashSeperator = true
): string {
	const nanoid = customAlphabet(alphabet, length)
	let serial = nanoid()

	if (length > 8 && dashSeperator) {
		const tailStartIdx = serial.length - 5
		return `${serial.substring(0, tailStartIdx)}-${serial.substring(
			tailStartIdx,
			length - 1
		)}`
	} else {
		return serial
	}
}

// console.log('randomString', randomString(8))
// console.log('randomString', randomString(9))
// console.log('randomSerial', randomSerial(8))
// console.log('randomSerial', randomSerial(9))
