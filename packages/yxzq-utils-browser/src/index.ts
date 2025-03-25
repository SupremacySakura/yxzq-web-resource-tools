import * as resourceStorageUtils from './resource-storage-utils/index'
import * as utils from './utils/index'
export * from './resource-storage-utils/index'
export * from './utils/index'
export type * from './resource-storage-utils/type'
export type * from './utils/type'

const yxzqUtils = {
    ...resourceStorageUtils,
    ...utils,
}
export default yxzqUtils