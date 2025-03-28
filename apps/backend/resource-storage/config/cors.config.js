//配置cors
//具体配置详见https://www.npmjs.com/package/koa2-cors
const corsOption = {
    origin:'*',
    allowMethods: ['GET', 'POST','DELETE','OPTIONS','PUT'],
    allowHeaders:['Content-Type','Authorization'],
}
module.exports = corsOption