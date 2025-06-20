//导入模块
const Router = require('@koa/router')
const path = require('path')
const fs = require('fs')
const { koaBody } = require('koa-body')
const { readFilesInDirectory, convertLocalPathToUrl, readFilesStructure, getMainFilePath } = require('../utils/index.js')
const { prefix } = require('../config/file.config.js')
//创建路由实例
const router = new Router()
const tempDir = path.join(__dirname, '.././temp')
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true }) // 创建目录
}
//首页
router.get('/', async (ctx, next) => {
  ctx.body = 'hello image storage'
})
//上传图片
router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '.././temp'),
    keepExtensions: true
  }
}), async (ctx) => {
  const host = ctx.host
  try {
    const file = ctx.request.files.file  // 文件
    if (!file) {
      ctx.body = {
        message: 'File does not exist!',
        filePath: null,
        code: 500,
      }
      return
    }
    //文件相关配置
    const folderName = ctx.request.body.folderName || 'default'  // 设置存储的文件夹
    const fileName = ctx.request.body.fileName || 'default_name'  // 设置存储的文件名
    const useDate = ctx.request.body.useDate || 'yes' // 是否使用日期作为文件夹
    const ext = ctx.request.body.ext || 'jpg' // 文件后缀
    const targetDir = path.join(__dirname, '.././public', folderName)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true }) // 创建文件夹
    }
    const oldPath = file.filepath // formidable 自动生成的文件路径
    let newPath
    if (useDate === 'no') {
      newPath = path.join(targetDir, `${fileName}.${ext}`)
    } else {
      const dateString = new Date().getTime().toString()
      newPath = path.join(targetDir, `${fileName + dateString}.${ext}`)
    }

    fs.renameSync(oldPath, newPath) // 将文件移动到指定目录
    ctx.body = {
      message: 'File uploaded successfully!',
      filePath: `http://${host}/${prefix}/${folderName}/${path.basename(newPath)}`,
      code: 200,
    }
  } catch (error) {
    console.error(error)
    ctx.body = {
      message: 'File uploaded unsuccessfully!',
      error: error.message,
      filePath: null,
      code: 500,
    }
  }
})
// 获取 public 文件夹下所有图片文件的路径
const publicDir = path.join(__dirname, '../public')
//获取public下文件
router.post('/filePath', async (ctx) => {
  const { extNameConfig = 'all' } = ctx.request.body
  const files = readFilesInDirectory(publicDir, extNameConfig)
  files.forEach((file, index) => {
    files[index] = convertLocalPathToUrl(ctx, file)
  })
  ctx.body = {
    message: 'Query successful!',
    files: files,
    code: 200,
  }
})
//获取public下文件结构
router.get('/fileStructure', async (ctx) => {
  const filesStructure = readFilesStructure(publicDir)
  ctx.body = {
    message: 'Query successful!',
    filesStructure: filesStructure,
    code: 200,
  }
})
//删除文件
router.delete('/deleteFile', async (ctx) => {
  const { filePath = '' } = ctx.request.body
  const mainPath = getMainFilePath(filePath)
  if (!filePath) {
    ctx.body = {
      message: 'File path does not exist!',
      code: 500,
    }
    return
  }
  const targetPath = path.join(publicDir, mainPath)
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath)
    ctx.body = {
      message: 'Delete successful!',
      code: 200,
    }
  }
})
module.exports = router