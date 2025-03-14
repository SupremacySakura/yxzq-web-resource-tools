const fs = require('fs')
const path = require('path')

// 判断文件是否是图片文件，支持的扩展名可以根据需求添加
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']

/**
 * 递归读取指定目录下的文件
 * 
 * @param {string} dirPath - 要读取的目录路径
 * @param {string|string[]} [extNameConfig='all'] - 文件筛选配置
 *   - 'all': 读取所有文件
 *   - 'photo': 只读取图片文件（支持 .jpg, .jpeg, .png, .gif, .webp, .bmp, .svg）
 *   - string[]: 自定义文件扩展名数组（如 ['.html', '.css']）
 * 
 * @returns {string[]} 符合条件的文件路径数组
 * 
 * @example
 * // 读取所有文件
 * readFilesInDirectory('./public')
 * 
 * // 只读取图片
 * readFilesInDirectory('./public', 'photo')
 * 
 * // 读取指定类型文件
 * readFilesInDirectory('./public', ['.html', '.css'])
 */
function readFilesInDirectory(dirPath, extNameConfig = 'all') {
    let result = []

    // 读取文件夹中的所有文件和文件夹
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        const stats = fs.statSync(filePath) // 获取文件或文件夹的状态信息

        if (stats.isDirectory()) {
            // 如果是文件夹，递归读取该文件夹
            result = result.concat(readFilesInDirectory(filePath, extNameConfig))
        } else if (stats.isFile()) {
            // 如果是文件，检查是否满足条件
            if (extNameConfig === 'all') {
                result.push(filePath)
            } else if (extNameConfig === 'photo') {
                const extname = path.extname(file).toLowerCase()
                if (imageExtensions.includes(extname)) {
                    result.push(filePath)  // 如果是图片，加入结果数组
                }
            } else if (extNameConfig instanceof Array) {
                const extname = path.extname(file).toLowerCase()
                if (extNameConfig.includes(extname)) {
                    result.push(filePath)  // 自定义后缀名
                }
            }
        }
    })

    return result
}
/**
 * 获取当前服务的基础URL
 * 
 * @param {Object} ctx - Koa 上下文对象
 * @param {Object} ctx.request - 请求对象
 * @param {string} ctx.request.protocol - 请求协议（'http' 或 'https'）
 * @param {string} ctx.request.host - 主机信息（包含域名和端口）
 * 
 * @returns {string} 完整的服务器基础URL（如：'http://localhost:3000'）
 * 
 * @example
 * const baseUrl = getServerBase(ctx)
 * // 返回: 'http://localhost:3000'
 */
function getServerBase(ctx) {
    const protocol = ctx.request.protocol // "http" 或 "https"
    const host = ctx.request.host// 包含 IP/域名和端口（如 "localhost:3000"）
    return `${protocol}://${host}`
}
/**
 * 将本地文件路径转换为可访问的URL
 * 
 * @param {Object} ctx - Koa 上下文对象
 * @param {string} localPath - 本地文件路径
 * @returns {string} 转换后的URL地址
 *   - 如果路径包含 '/public/'，则转换为对应的URL
 *   - 如果不匹配规则，则返回原始路径
 * 
 * @example
 * // Windows 路径
 * convertLocalPathToUrl(ctx, 'D:\\project\\public\\images\\test.jpg')
 * // 返回: 'http://localhost:3000/image/images/test.jpg'
 * 
 * // Unix 路径
 * convertLocalPathToUrl(ctx, '/usr/local/public/images/test.jpg')
 * // 返回: 'http://localhost:3000/image/images/test.jpg'
 */
function convertLocalPathToUrl(ctx, localPath) {
    const regex = /\/public\/([a-zA-Z0-9_\-/.]+)/
    const normalizedPath = localPath.replace(/\\/g, '/') // 处理 Windows 反斜杠
    const match = normalizedPath.match(regex)
    if (!match) return localPath // 非目标路径直接返回

    const baseUrl = getServerBase(ctx)
    return `${baseUrl}/image/${match[1]}`
}
/**
 * 递归读取目录结构
 * 
 * @param {string} dirPath - 要读取的目录路径
 * @returns {Array<Object>} 目录结构数组
 *   - 文件夹对象结构: { type: 'folder', name: string, children: Array<Object> }
 *   - 文件对象结构: { type: 'file', name: string }
 * 
 * @example
 * // 返回示例
 * readFilesStructure('./public')
 * // 返回:
 * // [
 * //   { type: 'folder', name: 'images', children: [
 * //     { type: 'file', name: 'test.jpg' }
 * //   ]},
 * //   { type: 'file', name: 'index.html' }
 * // ]
 */
function readFilesStructure(dirPath){
    let res = []
    const files = fs.readdirSync(dirPath)
    files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            res.push({
                type: 'folder',
                name: file,
                children: readFilesStructure(filePath)
            })
        } else if (stats.isFile()) {
            res.push({
                type: 'file',
                name: file
            })
        }
    })
    return res
}
module.exports = {
    readFilesInDirectory,
    getServerBase,
    convertLocalPathToUrl,
    readFilesStructure,
}

