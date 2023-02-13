import camelcase from 'camelcase'

export function compareObjWithKeys(
  fromObj: any,
  toObj: any,
  compareProps?: Array<string>
) {
  if (fromObj == undefined && toObj) {
    return false
  }

  if (fromObj && toObj == undefined) {
    return false
  }

  const props = compareProps || Object.keys(fromObj)

  return props.every((prop) => {
    if (fromObj[prop] && toObj[prop]) {
      return fromObj[prop].toString() === toObj[prop].toString()
    } else {
      return fromObj[prop] === toObj[prop]
    }
  })
}

export function hasSameProps(obj1: any, obj2: any) {
  const obj1Props = Object.keys(obj1)
  const obj2Props = Object.keys(obj2)

  if (obj1Props.length === obj2Props.length) {
    return obj1Props.every(function (prop) {
      return obj2Props.indexOf(prop) >= 0
    })
  }

  return false
}

export function objectKeyToCamelCase(obj: any) {
  let ccObj = {} as any

  Object.keys(obj).forEach((key) => {
    let camelKey = camelcase(key)
    ccObj[camelKey] = obj[key]
  })

  return ccObj
}
