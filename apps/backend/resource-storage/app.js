//导入koa相关中间件
const koa = require('koa')
const mount = require('koa-mount')
const koaStatic = require('koa-static')
const compose = require('koa-compose')
const cors = require('koa2-cors')
const corsOption = require('./config/cors.config')
const { koaBody } = require('koa-body')
const { showRequest } = require('./middlewares/index')
const fileOption = require('./config/file.config.js')
//导入其他中间件
const path = require('path')
//导入路由
const indexRouter = require('./routes/index')
//创建app实例
const app = new koa()
//错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    console.error('Server Error:', err);
  }
})
app.use(compose([showRequest]))
//跨域处理
app.use(cors(corsOption))
//请求处理
app.use(koaBody({
  json: true,
  parsedMethods: ['POST', 'PUT', 'GET', 'DELETE'],
}))
//挂载静态资源
app.use(mount(`/${fileOption.prefix}`, koaStatic(path.resolve(__dirname, './public'))))
//挂载路由
app.use(mount('/', indexRouter.routes())).use(indexRouter.allowedMethods())
//监听端口
app.listen(3100, () => {
  console.log('server is running at http://localhost:3100')
  console.log(`resource is running at http://localhost:3100/${fileOption.prefix}`)
})