import sortBy from 'lodash.sortby'
import { compareObjWithKeys } from './object'

export function dataColExtend(
  rows = [] as Array<any>,
  groupByColProps = [] as Array<string>,
  type: string, // L1, L2
  colHeaderProp: string, // 列头字段
  colDataProps = [] as Array<string> // 列数据字段
) {
  if (!type) {
    throw new Error('ERROR_type_UNDEFINED')
  }

  if (!colHeaderProp) {
    throw new Error('ERROR_colDataProps_UNDEFINED')
  }

  rows = sortBy(rows, groupByColProps)
  // colDataProps = sortBy(colDataProps)

  const newRows = [] as Array<any>
  let newRow = {} as any
  rows.forEach((r) => {
    const groupBySame = compareObjWithKeys(r, newRow, groupByColProps)
    if (groupBySame) {
      if (type.toUpperCase() === 'L1') {
        l1Extend(colDataProps, colHeaderProp, newRow, r)
      } else if (type.toUpperCase() === 'L2') {
        l2Extend(colDataProps, colHeaderProp, newRow, r)
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
        l1Extend(colDataProps, colHeaderProp, newRow, r)
      } else if (type.toUpperCase() === 'L2') {
        l2Extend(colDataProps, colHeaderProp, newRow, r)
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
  colDataProps = [] as Array<string> // 列数据字段
) {
  rows = sortBy(rows, groupByColProps)

  const newRows = [] as Array<any>
  let newRow = {} as any
  let conSeq = 1
  rows.forEach((r) => {
    const groupBySame = compareObjWithKeys(r, newRow, groupByColProps)
    if (groupBySame) {
      flatExtend(colDataProps, newRow, r, conSeq)
    } else {
      conSeq = 1
      newRow = new Object()
      const keys = Object.keys(r)
      keys.forEach((k) => {
        if (groupByColProps.includes(k)) {
          newRow[k] = r[k]
        }
      })

      flatExtend(colDataProps, newRow, r, conSeq)
      newRows.push(newRow)
    }
    conSeq += 1
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
  colDataProps: Array<string>,
  newRow: any,
  r: Array<any>,
  rownum: number
) {
  colDataProps.forEach((prop) => {
    const i = rownum % colDataProps.length
    const seq = i == 0 ? colDataProps.length : i
    // @ts-ignore
    newRow[`${prop}_${seq}`] = r[prop]
  })
}

function l1Extend(
  colDataProps: Array<string>,
  colHeaderProp: string,
  newRow: any,
  r: Array<any>
) {
  colDataProps.forEach((prop) => {
    // @ts-ignore
    newRow[`${r[colHeaderProp]}_${prop}`] = r[prop]
  })
}

function l2Extend(
  colDataProps: Array<string>,
  colHeaderProp: string,
  newRow: any,
  r: Array<any>
) {
  colDataProps.forEach((prop) => {
    // @ts-ignore
    newRow[`${prop}_${r[colHeaderProp]}`] = r[prop]
  })
}
