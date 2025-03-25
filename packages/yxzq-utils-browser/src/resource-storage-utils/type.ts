interface UploadConfig {
    folderName?: string
    fileName?: string
    url?: string
    useDate?: 'yes' | 'no'
    ext?: string
}
interface UploadResult {
    message: string
    error?: any
    filePath: string | null
    code: number
}
interface GetFilePathConfig {
    url?: string
    extNameConfig?: 'all' | 'photo' | Array<string>
}
interface GetFilePathResult {
    message: string
    files: Array<string>
    code: number
    err?: any
}
interface fileStructure {
    type:'file' | 'folder'
    name: string
    children?: Array<fileStructure>
}
interface GetFilesStructureConfig {
    url?: string
}
interface GetFilesStructureResult {
    message: string
    filesStructure: Array<fileStructure>
    code: number
    err?: any
}
interface DeleteFileConfig {
    filePath: string
    url?: string
}
interface DeleteFileResult {
    message: string
    code: number
    err?: any
}
export {
    UploadConfig,
    UploadResult,
    GetFilePathConfig,
    GetFilePathResult,
    fileStructure,
    GetFilesStructureConfig,
    GetFilesStructureResult,
    DeleteFileConfig,
    DeleteFileResult,
}