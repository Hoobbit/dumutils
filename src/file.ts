import fs from 'fs'
import path from 'path'

interface IFileInfo {
  fileName: string
}

/**
 * @param directoryPath
 * @returns
 */
export function viewDirectoryContents(
  directoryPath: string,
  fileFullName = false
): {
  items: Array<IFileInfo>
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
export function deleteFile(filePath: string, fileName: string) {
  const fileFullName = buildFileFullPath(filePath, fileName)

  fs.accessSync(fileFullName, fs.constants.W_OK)
  fs.unlinkSync(fileFullName)
}

/**
 * add deleted prefix: ex: xxx.js -> deleted_xxx.js
 * @param filePath
 * @param fileName
 */
export function softDeleteFile(filePath: string, fileName: string) {
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
export function createFile(
  filePath: string,
  fileName: string,
  fileData: string | NodeJS.ArrayBufferView
) {
  filePath = buildFileFullPath(filePath)
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true })
  }

  const fileFullName = buildFileFullPath(filePath, fileName)
  fs.writeFileSync(fileFullName, fileData)
}

/**
 * 转换成系统(win32/posix)路径
 * @param filePath
 * @returns
 */
export function systemPath(filePath: string, sysType?: string): string {
  const platform = sysType || process.platform

  let systemPath = path.resolve(filePath)
  if (platform == 'win32') {
    // windows check
    systemPath = systemPath.split(path.posix.sep).join(path.win32.sep)
  } else {
    systemPath = systemPath.split(path.win32.sep).join(path.posix.sep)
  }

  return systemPath
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
