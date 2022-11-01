import { expect } from 'chai'
import { arrangeObjArray } from '../../src/array'

const twoDeepthCompare = function (oldObj: any, newObj: any) {
	return oldObj.role.id == newObj.role.id
}

describe('arrangeObjArrayTest', function () {
	it(`arrange array(with default compare function)`, () => {
		const fromObjArray = [
			{ id: 'or000' },
			{ id: 'or001' },
			{ id: 'or002' },
			{ id: 'or003' }
		]

		const toObjArray = [
			{ id: 'nr002' },
			{ id: 'or001' },
			{ id: 'nr003' },
			{ id: 'nr004' }
		]

		const { add, remove } = arrangeObjArray(fromObjArray, toObjArray)

		expect(add.length).to.equal(3)
		const addedIds = ['nr002', 'nr003', 'nr004']
		add.forEach((obj) => {
			expect(addedIds.includes(obj.id)).to.equal(
				true,
				'Add array does not correct!!!'
			)
		})

		expect(remove.length).to.equal(3)
		const removedIds = ['or000', 'or002', 'or003']
		remove.forEach((obj) => {
			expect(removedIds.includes(obj.id)).to.equal(
				true,
				'Remove array does not correct!!!'
			)
		})
	})

	it(`arrange 2deepth array(with custom compare function)`, () => {
		const fromObjArray = [
			{
				role: { id: 'or001' }
			},
			{
				role: { id: 'or002' }
			},
			{
				role: { id: 'or003' }
			}
		]

		const toObjArray = [
			{
				role: { id: 'nr002' }
			},
			{
				role: { id: 'or001' }
			},
			{
				role: { id: 'nr003' }
			},
			{
				role: { id: 'nr004' }
			}
		]

		const { add, remove } = arrangeObjArray(
			fromObjArray,
			toObjArray,
			twoDeepthCompare
		)

		expect(add.length).to.equal(3)

		const addedIds = ['nr002', 'nr003', 'nr004']
		add.forEach((obj) => {
			expect(addedIds.includes(obj.role.id)).to.equal(
				true,
				'Add array does not correct!!!'
			)
		})

		expect(remove.length).to.equal(2)
		const removedIds = ['or002', 'or003']
		remove.forEach((obj) => {
			expect(removedIds.includes(obj.role.id)).to.equal(
				true,
				'Remove array does not correct!!!'
			)
		})
	})
})
