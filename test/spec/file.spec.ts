import { expect } from 'chai'
import {
	createFile,
	viewDirectoryContents,
	deleteFile,
	softDeleteFile
} from '../../src/file'

const path = './test/data'
const fileName = 'xxx.test.txt'
describe('fileTest', function () {
	it(`createFileTest`, () => {
		createFile(
			path,
			fileName,
			JSON.stringify({
				hello: 'world',
				long: 99
			})
		)
	})

	it(`viewDirectoryContentsTest`, () => {
		const { items } = viewDirectoryContents(path)

		const findCnt = items.filter((obj) => {
			return obj.fileName === fileName
		}).length

		expect(findCnt).to.above(0)
	})

	it(`softDeleteFileTest`, () => {
		softDeleteFile(path, fileName)

		const { items } = viewDirectoryContents(path)
		const findCnt = items.filter((obj) => {
			return obj.fileName === `deleted_${fileName}`
		}).length

		expect(findCnt).to.above(0)
	})

	it(`deleteFileTest`, () => {
		deleteFile(path, `deleted_${fileName}`)

		const { items } = viewDirectoryContents(path)
		const findCnt = items.filter((obj) => {
			obj.fileName === `deleted_${fileName}`
		}).length

		expect(findCnt).to.equal(0)
	})
})
