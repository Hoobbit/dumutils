import sortBy from 'lodash.sortby'
import { compareObjWithKeys } from './object'

export function dataColExtend(
  rows = [] as Array<any>,
  groupByColProps = [] as Array<string>,
  type: string, // L1, L2
  colHeaderProp: string, // 列头字段
  matchDynHeaderProps = [] as Array<string> // 列数据字段
) {
  if (!type) {
    throw new Error('ERROR_type_UNDEFINED')
  }

  if (!colHeaderProp) {
    throw new Error('ERROR_matchDynHeaderProps_UNDEFINED')
  }

  rows = sortBy(rows, groupByColProps)
  matchDynHeaderProps = sortBy(matchDynHeaderProps)

  const newRows = [] as Array<any>
  let newRow = {} as any
  rows.forEach((r) => {
    const groupBySame = compareObjWithKeys(r, newRow, groupByColProps)
    if (groupBySame) {
      if (type.toUpperCase() === 'L1') {
        l1Extend(matchDynHeaderProps, colHeaderProp, newRow, r)
      } else if (type.toUpperCase() === 'L2') {
        l2Extend(matchDynHeaderProps, colHeaderProp, newRow, r)
      }
    } else {
      newRow = new Object()
      const keys = Object.keys(r)
      keys.forEach((k) => {
        if (groupByColProps.includes(k)) {
          newRow[k] = r[k]
        }
      })

      if (type.toUpperCase() === 'L1') {
        l1Extend(matchDynHeaderProps, colHeaderProp, newRow, r)
      } else if (type.toUpperCase() === 'L2') {
        l2Extend(matchDynHeaderProps, colHeaderProp, newRow, r)
      }
      newRows.push(newRow)
    }
  })

  return newRows
}

export function dataColFlatExtend(
  rows = [] as Array<any>,
  groupByColProps = [] as Array<string>,
  // repeatType = 'sequential', // sequential, chunked
  matchDynHeaderProps = [] as Array<string> // 列数据字段
) {
  rows = sortBy(rows, groupByColProps)

  const newRows = [] as Array<any>
  let newRow = {} as any
  rows.forEach((r, idx) => {
    const groupBySame = compareObjWithKeys(r, newRow, groupByColProps)
    if (groupBySame) {
      flatExtend(matchDynHeaderProps, newRow, r, idx + 1)
    } else {
      newRow = new Object()
      const keys = Object.keys(r)
      keys.forEach((k) => {
        if (groupByColProps.includes(k)) {
          newRow[k] = r[k]
        }
      })

      flatExtend(matchDynHeaderProps, newRow, r, idx + 1)
      newRows.push(newRow)
    }
  })

  // if (repeatType.toLowerCase() === 'sequential') {
  //   // do nothing
  // } else if (repeatType.toLowerCase() === 'chunked') {
  //   // reorder columns
  // }

  // console.log(newRows)
  return newRows
}

function flatExtend(
  matchDynHeaderProps: Array<string>,
  newRow: any,
  r: Array<any>,
  rownum: number
) {
  matchDynHeaderProps.forEach((prop) => {
    const i = rownum % matchDynHeaderProps.length
    const seq = i == 0 ? matchDynHeaderProps.length : i
    // @ts-ignore
    newRow[`${prop}_${seq}`] = r[prop]
  })
}

function l1Extend(
  matchDynHeaderProps: Array<string>,
  colHeaderProp: string,
  newRow: any,
  r: Array<any>
) {
  matchDynHeaderProps.forEach((prop) => {
    // @ts-ignore
    newRow[`${r[colHeaderProp]}_${prop}`] = r[prop]
  })
}

function l2Extend(
  matchDynHeaderProps: Array<string>,
  colHeaderProp: string,
  newRow: any,
  r: Array<any>
) {
  matchDynHeaderProps.forEach((prop) => {
    // @ts-ignore
    newRow[`${prop}_${r[colHeaderProp]}`] = r[prop]
  })
}
