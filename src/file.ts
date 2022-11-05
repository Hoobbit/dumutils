import fs from 'node:fs'
import path from 'path'

/**
 * @param directoryPath
 * @returns
 */
export function viewDirectoryContents(
	directoryPath: string,
	fileFullName = false
): {
	items: Array<string>
	total: number
} {
	directoryPath = buildFileFullPath(directoryPath)
	fs.accessSync(directoryPath, fs.constants.R_OK)

	const fileNames = fs.readdirSync(directoryPath)
	let result = [] as any[]
	fileNames.forEach((fileName) => {
		if (fileFullName) {
			fileName = buildFileFullPath(directoryPath, fileName)
		}

		result.push({ fileName })
	})

	return { items: result, total: fileNames.length }
}

/**
 * @param filePath
 * @param fileName
 */
export async function deleteFile(
	filePath: string,
	fileName: string
): Promise<void> {
	const fileFullName = buildFileFullPath(filePath, fileName)

	fs.accessSync(fileFullName, fs.constants.W_OK)
	fs.unlinkSync(fileFullName)
}

/**
 * @param filePath
 * @param fileName
 */
export async function softDeleteFile(
	filePath: string,
	fileName: string
): Promise<void> {
	let oldFileFullName = `${filePath}/${fileName}`
	let newFileFullName = `${filePath}/deleted_${fileName}`
	if (process.platform == 'win32') {
		oldFileFullName = oldFileFullName.split(path.posix.sep).join(path.sep)
	}

	fs.accessSync(oldFileFullName, fs.constants.W_OK)
	fs.renameSync(oldFileFullName, newFileFullName)
}

/**
 * @param filePath
 * @param fileName
 * @param fileData
 */
export async function createFile(
	filePath: string,
	fileName: string,
	fileData: string | NodeJS.ArrayBufferView
): Promise<void> {
	filePath = buildFileFullPath(filePath)
	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(filePath, { recursive: true })
	}

	const fileFullName = buildFileFullPath(filePath, fileName)
	fs.writeFileSync(fileFullName, fileData)
}

/**
 * @param filePath
 * @param fileName
 * @returns fileFullName
 */
function buildFileFullPath(filePath: string, fileName?: string): string {
	let fileFullPath = path.resolve(filePath, fileName || '')
	if (process.platform == 'win32') {
		// windows check
		fileFullPath = fileFullPath.split(path.posix.sep).join(path.sep)
	}

	return fileFullPath
}
