import diffWith from 'lodash.differencewith'

export interface IArrangedArray {
	remove: Array<any>
	add: Array<any>
}

/**
 * compare two array grouping added, and removed.
 * @param from
 * @param to
 * @param compare
 * @returns IArrangedArray
 */
export function arrangeObjArray(
	from: Array<any>,
	to: Array<any>,
	compare = defaultCompare
): IArrangedArray {
	const remove = diffWith(from, to, compare)
	const add = diffWith(to, from, compare)
	return {
		remove,
		add
	}
}

function defaultCompare(oldObj: any, newObj: any) {
	return oldObj.id == newObj.id
}

export interface IRelFields {
	leftField: string
	rightField: string
}

/**
 * leftJoin
 * @param rows1
 * @param rows2
 * @param rels
 * @param rows2Fields
 * @param fillEmptyField
 * @returns
 */
export function leftJoin(
	rows1: Array<any>,
	rows2: Array<any>,
	rels: Array<IRelFields>,
	fillEmptyField = true,
	rows2Fields?: Array<string>
): Array<any> {
	let results = []
	let buildRow2Fields = false
	if (!rows2Fields) {
		buildRow2Fields = true
		rows2Fields = [] as string[]
	}

	for (let idx1 in rows1) {
		let row1 = rows1[idx1]

		let noHit = true
		for (let idx2 in rows2) {
			let hit = true
			let row2 = rows2[idx2]
			if (buildRow2Fields) {
				Object.keys(row2).forEach((colKey) => {
					if (!rows2Fields?.includes(colKey)) {
						rows2Fields?.push(colKey)
					}
				})
			}

			for (let relIdx in rels) {
				const rel = rels[relIdx]
				if (row1[rel.leftField] != row2[rel.rightField]) {
					hit = false
					break
				}
			}

			if (hit) {
				noHit = false
				const joinRow = {
					...row1
				}
				Object.keys(row2).forEach((key: string) => {
					if (!joinRow[key]) {
						joinRow[key] = row2[key]
					}
				})

				results.push(joinRow)
			}
		}

		if (noHit) {
			const joinRow = { ...row1 }
			if (fillEmptyField) {
				rows2Fields.forEach((field) => {
					if (!joinRow[field]) {
						joinRow[field] = null
					}
				})
			}

			results.push(joinRow)
		}
	}

	return results
}

/**
 * innerJoin
 * @param rows1
 * @param rows2
 * @param rels
 * @returns
 */
export function innerJoin(
	rows1: Array<any>,
	rows2: Array<any>,
	rels: Array<IRelFields>
): Array<any> {
	let results = []
	for (let idx1 in rows1) {
		let row1 = rows1[idx1]
		for (let idx2 in rows2) {
			let row2 = rows2[idx2]
			let hit = true
			for (let relIdx in rels) {
				const rel = rels[relIdx]
				if (row1[rel.leftField] != row2[rel.rightField]) {
					hit = false
					break
				}
			}

			if (hit) {
				const joinRow = { ...row1 }
				Object.keys(rows2[0]).forEach((key) => {
					if (!joinRow[key]) {
						joinRow[key] = row2[key]
					}
				})
				results.push(joinRow)
			}
		}
	}

	return results
}

export function subJoin(
	mainRows: Array<any>,
	subRows: Array<any>,
	rels: Array<IRelFields>,
	subItemsKey = 'children'
): Array<any> {
	for (let mainIdx in mainRows) {
		let mainRow = mainRows[mainIdx]
		let children = []
		for (let subIdx in subRows) {
			let subRow = subRows[subIdx]
			let hit = true
			for (let relIdx in rels) {
				const rel = rels[relIdx]
				if (mainRow[rel.leftField] != subRow[rel.rightField]) {
					hit = false
					break
				}
			}

			if (hit) {
				children.push(subRow)
			}
		}

		mainRow[subItemsKey] = children
	}

	return mainRows
}

/**
 *  change one row array to name, value Object array
 * @param arr
 * @returns
 */
export function buildNameValueObjectArray(data: Array<any> | Object): any {
	if (!data) {
		return []
	}

	let nvObjArr = [] as Array<any>
	let orgObj = {} as Object
	if (Array.isArray(data)) {
		if (data.length == 0) {
			return []
		}

		// just one row
		orgObj = data[0]
	} else {
		orgObj = data
	}

	Object.keys(orgObj).forEach((key) => {
		const nvObj = {} as any
		nvObj['name'] = key
		// @ts-ignore
		nvObj['value'] = orgObj[key]

		nvObjArr.push(nvObj)
	})

	// // nvObj
	// {
	// 	name: '',
	// 	desc: ''
	// }
	return nvObjArr
}
