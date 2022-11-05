import jwt, { Algorithm } from 'jsonwebtoken'

export interface IUserInfo {
	name: string
	description: string
}

export function publishToken(
	userInfo: IUserInfo,
	secretOrPublicKey: string,
	expiresIn: string, // '1h', '1d'
	algorithm?: Algorithm | undefined
) {
	const token = jwt.sign(
		// {
		// 	exp: Math.floor(Date.now() / 1000) + 60 * 60, // min
		// 	data: userInfo as Object
		// },
		userInfo as Object,
		secretOrPublicKey,
		{
			expiresIn,
			algorithm // default: HS256
		}
	)

	// const token = jwt.sign(
	// 	{
	// 		exp: Math.floor(Date.now() / 1000) + 60 * 60, // min
	// 		data: userInfo as Object
	// 	},
	// 	secretOrPublicKey
	// )

	return token
}

export function verifyToken(
	token: string,
	secretOrPublicKey: string
	// options?: { json: string; complete: boolean }
) {
	try {
		const decoded = jwt.verify(token, secretOrPublicKey)
		return decoded
	} catch (err) {
		throw new Error()
	}
}
