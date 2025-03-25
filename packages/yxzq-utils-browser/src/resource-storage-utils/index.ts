import { checkIfInstanceOf } from "../utils/index"
import type { UploadConfig, UploadResult, GetFilePathConfig, GetFilePathResult, fileStructure, GetFilesStructureConfig, GetFilesStructureResult, DeleteFileConfig, DeleteFileResult } from "./type.ts"
/**
 * 异步上传文件到指定URL。（此工具需配合作者其他工具resource-storage使用）
 *
 * @async
 * @param {File | Blob} file - 要上传的文件，可以是 `File` 或 `Blob` 类型。
 * @param {UploadConfig} [config={}] - 配置对象，用于自定义上传行为。
 * @param {string} [config.folderName='default'] - 文件将被存储的文件夹名称。默认值为 'default'。
 * @param {string} [config.fileName='default_name'] - 上传文件的名称。如果未提供，则使用默认名称。默认值为 'default_name'。
 * @param {string} [config.url='http://localhost:3100'] - 上传的目标URL。默认值为 'http://localhost:3100'。
 * @param {'yes' | 'no'} [config.useDate='yes'] - 是否在文件名中使用日期前缀。支持 'yes' 或 'no'。默认值为 'yes'。
 * @param {string} [config.ext='jpg'] - 文件扩展名。默认值为 'jpg'。
 *
 * @returns {Promise<UploadResult>} 返回一个Promise，解析为包含上传结果的对象：
 * - `message`: 描述信息。
 * - `error`: 错误信息（如果有）。
 * - `filePath`: 文件路径（成功时）或null（失败时）。
 * - `code`: HTTP状态码或错误代码。
 *
 * @throws {TypeError} 如果提供的 `file` 不是 `File` 或 `Blob` 类型。
 */
const uploadResource = async (file: File | Blob, config: UploadConfig = {}): Promise<UploadResult> => {
    if (!file) {
        return {
            message: 'file is required',
            error: 'file is required',
            filePath: null,
            code: 400
        }
    }
    const {
        folderName = 'default',
        fileName = 'default_name',
        url = 'http://localhost:3100',
        useDate = 'yes',
        ext = 'jpg'
    } = config
    const wholeUrl = url + '/upload'
    const formData = new FormData()
    if (checkIfInstanceOf(file, File) || checkIfInstanceOf(file, Blob)) {
        formData.append('file', file)
    } else {
        return {
            message: 'file type is not supported',
            error: 'file type is not supported',
            filePath: null,
            code: 400
        }
    }
    formData.append('folderName', folderName)
    formData.append('fileName', fileName)
    formData.append('useDate', useDate)
    formData.append('ext', ext)
    try {
        const response = await fetch(wholeUrl, {
            method: 'POST',
            body: formData
        })
        return response.json()
    } catch (err) {
        return {
            message: 'An error occurred during the request',
            error: err,
            filePath: null,
            code: 400
        }
    }

}
/**
 * 异步获取文件路径。（此工具需配合作者其他工具resource-storage使用）
 *
 * @async
 * @param {GetFilePathConfig} [config={}] - 配置对象，用于自定义请求行为。
 * @param {string} [config.url='http://localhost:3100'] - 请求的目标URL。默认值为'http://localhost:3100'。
 * @param {string | string[]} [config.extNameConfig='all'] - 文件扩展名配置。默认值为'all',可选值'photo',也可传入后缀名数组,如['html','jpg']。
 *
 * @returns {Promise<GetFilePathResult>} 返回一个Promise，解析为包含获取结果的对象：
 * - `message`: 描述信息。
 * - `files`: 包含文件路径的数组（成功时）或空数组（失败时）。
 * - `code`: HTTP状态码或错误代码。
 * - `err`: 错误信息（如果有）。
 *
 * @throws {Error} 如果在请求过程中发生网络错误或其他异常。
 */
const getFilePath = async (config: GetFilePathConfig = {}): Promise<GetFilePathResult> => {

    const {
        url = 'http://localhost:3100',
        extNameConfig = 'all'
    } = config
    const wholeUrl = url + '/filePath'
    try {
        const response = await fetch(wholeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                extNameConfig
            })
        })
        return response.json()
    } catch (err) {
        return {
            message: 'An error occurred during the request',
            files: [],
            code: 400,
            err: err,
        }
    }
}
/**
 * 异步获取文件结构。（此工具需配合作者其他工具resource-storage使用）
 *
 * @async
 * @param {GetFilesStructureConfig} [config={}] - 配置对象，用于自定义请求行为
 * @param {string} [config.url='http://localhost:3100'] - 请求的目标URL。默认值为'http://localhost:3100'
 *
 * @returns {Promise<GetFilesStructureResult>} 返回一个Promise，解析为包含获取结果的对象：
 * - `message`: 请求结果描述信息
 * - `filesStructure`: 文件结构数组，包含文件和文件夹的层级结构
 *   - 文件夹结构: { type: 'folder', name: string, children: Array }
 *   - 文件结构: { type: 'file', name: string }
 * - `code`: HTTP状态码（200表示成功，400表示失败）
 * - `err`: 错误信息对象（请求失败时返回）
 *
 * @throws {Error} 如果在请求过程中发生网络错误或其他异常
 * 
 * @example
 * const result = await getFilesStructure();
 * // 成功返回示例:
 * // {
 * //   message: 'success',
 * //   filesStructure: [
 * //     { type: 'folder', name: 'images', children: [
 * //       { type: 'file', name: 'photo.jpg' }
 * //     ]},
 * //     { type: 'file', name: 'document.txt' }
 * //   ],
 * //   code: 200
 * // }
 */
const getFilesStructure = async (config: GetFilesStructureConfig = {}): Promise<GetFilesStructureResult> => {
    const {
        url = 'http://localhost:3100',
    } = config
    const wholeUrl = url + '/fileStructure'
    try {
        const response = await fetch(wholeUrl)
        return response.json()
    } catch (err) {
        return {
            message: 'An error occurred during the request',
            code: 400,
            err: err,
            filesStructure: [],
        }
    }
}
/**
 * 异步删除指定路径的文件。（此工具需配合作者其他工具resource-storage使用）
 *
 * @async
 * @param {DeleteFileConfig} [config={ filePath: '' }] - 配置对象，用于自定义删除行为
 * @param {string} config.filePath - 要删除的文件的完整URL路径
 * @param {string} [config.url='http://localhost:3100'] - 删除请求的目标URL。默认值为'http://localhost:3100'
 *
 * @returns {Promise<DeleteFileResult>} 返回一个Promise，解析为包含删除结果的对象：
 * - `message`: 描述信息
 * - `code`: HTTP状态码（200表示成功，400表示失败）
 * - `err`: 错误信息（如果有）
 *
 * @throws {Error} 如果在请求过程中发生网络错误或其他异常
 */
const deleteFile = async (config: DeleteFileConfig = { filePath: '' }): Promise<DeleteFileResult> => {
    const {
        filePath,
        url = 'http://localhost:3100',
    } = config
    const wholeUrl = url + '/deleteFile'
    try {
        const response = await fetch(wholeUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filePath
            })
        })
        return response.json()
    } catch (err) {
        return {
            message: 'An error occurred during the request',
            code: 400,
            err: err,
        }
    }
}
export {
    uploadResource,
    getFilePath,
    getFilesStructure,
    deleteFile,
}