var express = require('express');
var proxy = require('http-proxy-middleware');
const path = require('path')
const glob = require('glob')

const routeMap = glob.sync(path.join(__dirname, './src/**/*.html'))
var app = express();

// 设置静态资源目录 / ~>根目录  '/public'  ~> public目录
app.use(express.static(path.join(__dirname, '/src')))

var proxyTable = {
  '/api/formdata': {
    target: 'https://www.31huiyi.com', //转发到的地址
    changeOrigin: true,
    ws: true, // 代理websocket
    pathRewrite: {
      '^/api/formdata': ''
    },
  },
  '/api/corppageapi': {
    target: 'http://mock.31huiyi.com/mock/244', //转发到的地址
    changeOrigin: true,
    ws: true, // 代理websocket
    pathRewrite: {
      '^/api/corppageapi': ''
    },
  },
  '/api/corpmenumoduleapi': {
    target: 'http://mock.31huiyi.com/mock/244', //转发到的地址
    changeOrigin: true,
    ws: true, // 代理websocket
    pathRewrite: {
      '^/api/corpmenumoduleapi': ''
    },
  }
}


var proxyList = Object.keys(proxyTable)
console.log(proxyList)

proxyList.forEach(item => {
  let objItem = proxyTable[item]
  objItem.router = {}
  objItem.router[`localhost:3000${item}`] = `${objItem.target}${item}`
  app.use(item, proxy(objItem))
})


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // 设置下列选项浏览器就会按照json解析（res.sendFile直接输出html？）
  // 不设置默认是 Content-Type:text/html; charset=utf-8，正常输入网页
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 设置路由路径 和 指向文件地址
let ruotes = []
routeMap.forEach((item) => {
  var matches = item.split('/')
  if (!matches.length) {
    return false
  }
  const name = matches.pop().replace('.html', '')
  ruotes.push(name)
  app.get(`/${name}`, function(req, res) {
    res.sendFile(item)
  })
})
console.log('[ruotes]:', ruotes)
// app.get('/', function(req, res) {
//   // res.json({})
//   res.sendFile(__dirname+'/src/ajax.html')
// })

app.listen(3000, function() {
  console.log('Example app listing on port 3000!')
})