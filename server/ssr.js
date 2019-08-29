// server/ssr.js
const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()

const isDev = process.env.NODE_ENV !== 'production'
if (isDev) {
  app.use(async (ctx, next) => {
    if (/.+?\.(js|css|png|jpg|ttf|jpeg|json|svg|ico)$/.test(ctx.url)) {
      ctx.redirect('http://localhost:8080' + ctx.url)
    } else {
      await next()
    }
  })
}
const router = isDev ? require('./dev.ssr') : require('./server')
app.use(router.routes()).use(router.allowedMethods())
// 开放目录
app.use(koaStatic(resolve('../dist')))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app
