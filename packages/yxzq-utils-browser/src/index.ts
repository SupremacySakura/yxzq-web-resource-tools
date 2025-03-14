import { uploadResource, getFilePath,getFilesStructure } from './resource-storage-utils/index'
import { checkIfInstanceOf, debouncing, throtting, addCacheToAxios, addRetryToAxios } from './utils/index'
export { uploadResource, getFilePath, getFilesStructure }
export { checkIfInstanceOf, debouncing, throtting, addCacheToAxios, addRetryToAxios }
const yxzqUtils = {
    uploadResource,
    getFilePath,
    getFilesStructure,
    checkIfInstanceOf,
    debouncing,
    throtting,
    addCacheToAxios,
    addRetryToAxios,
}
export default yxzqUtils