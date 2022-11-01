import fs from 'node:fs'
import path from 'path'

/**
 * @param filePath
 * @param fileName
 */
export async function deleteFile(
	filePath: string,
	fileName: string
): Promise<void> {
	let fileFullName = `${filePath}/${fileName}`
	if (process.platform == 'win32') {
		fileFullName = fileFullName.split(path.posix.sep).join(path.sep)
	}

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
