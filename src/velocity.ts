import Velocity from 'velocityjs'

export function velocityParser(sqlTemplate: string, params?: Object): string {
	const sql = Velocity.render(sqlTemplate, params)
	return sql
}
