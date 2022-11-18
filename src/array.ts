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
	rows2Fields: Array<string>,
	fillEmptyField = true
): Array<any> {
	let results = []
	for (let idx1 in rows1) {
		let row1 = rows1[idx1]

		let noHit = true
		for (let idx2 in rows2) {
			let hit = true
			let row2 = rows2[idx2]
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
