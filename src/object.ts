import camelcase from 'camelcase'

export function compareObjWithKeys(
  fromObj: any,
  toObj: any,
  compareProps: Array<string>
) {
  if (fromObj == undefined && toObj) {
    return false
  }

  if (fromObj && toObj == undefined) {
    return false
  }

  return compareProps.every((prop) => {
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

// export function objectKeyToCamelCase(obj: any) {
//   let ccObj = {} as any

//   Object.keys(obj).forEach((key) => {
//     let camelKey = camelcase(key)
//     ccObj[camelKey] = obj[key]
//   })

//   return ccObj
// }

export function objectKeyToCamelCase(obj: any) {
  // 性能更好, 只能处理小写
  let ccObj = {} as any

  Object.keys(obj).forEach((key) => {
    let camelKey = key
      .toLowerCase()
      .replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
    ccObj[camelKey] = obj[key]
  })

  return ccObj
}

export function objectKeyToDecamelCase(obj: any) {
  let dccObj = {} as any

  Object.keys(obj).forEach((key) => {
    let camelKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    dccObj[camelKey] = obj[key]
  })

  return dccObj
}
