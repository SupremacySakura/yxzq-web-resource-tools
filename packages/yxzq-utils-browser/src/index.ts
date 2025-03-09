import { uploadResource, getFilePath } from './resource-storage-utils/index'
import { checkIfInstanceOf, debouncing, throtting, addCacheToAxios, addRetryToAxios } from './utils/index'
export { uploadResource, getFilePath }
export { checkIfInstanceOf, debouncing, throtting, addCacheToAxios, addRetryToAxios }
const yxzqUtils = {
    uploadResource,
    getFilePath,
    checkIfInstanceOf,
    debouncing,
    throtting,
    addCacheToAxios,
    addRetryToAxios,
}
export default yxzqUtils