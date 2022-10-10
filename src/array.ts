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
