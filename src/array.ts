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

// export function arrangeObjArray(from: Array<any>, to: Array<any>, key?: string) {
//   const results = from.filter((fromObj) => !to.some((toObj) => toObj.id === fromObj.id))
//   return results
// }

const oldRoleMenus = [
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'm123'
		},
		actionName: 'CREATE'
	},
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'm223'
		},
		actionName: 'CREATE'
	},
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'm323'
		},
		actionName: 'CREATE'
	}
]

const newRoleMenus = [
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'mn23'
		}
	},
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'm123'
		}
	},
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'm223'
		}
	},
	{
		role: {
			id: 'a123'
		},
		menu: {
			id: 'mm33'
		}
	}
]

// const compare = function (oldObj: any, newObj: any) {
//   return oldObj.menu.id == newObj.menu.id
// }

// const aa = arrangeObjArray(oldRoleMenus, newRoleMenus, compare)
// console.log(aa)
