import Velocity from 'velocityjs'

export function velocityParser(sqlTemplate: string, params?: Object) {
  var sql = Velocity.render(sqlTemplate, params)
  return sql
}
