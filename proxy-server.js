// npm install --save-dev express
// npm install --save-dev http-proxy-middleware
var express = require('express');
var proxy = require('http-proxy-middleware');
const path = require('path')
var app= express();
// var options = {
//   target: 'https://www.31huiyi.com', //转发到的地址
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // 代理websocket
//   pathRewrite: {
//     '^/api': '', // rewrite path
//   },
//   // router: {
//   //   // 当请求localhost:3000/api时，会转发到http://localhost:8080,
//   //   'localhost:3000/api': 'http://localhost:8080'
//   // }
// }
// var exampleProxy = proxy(options)
// app.use('/api', exampleProxy)
// app.get('/ajax.html', function(req,res){
//      res.sendFile(__dirname+'/ajax.html');
// });
// app.listen(3000,function(){
// 	console.log('服务启动到3000端口')
// })

app.use(express.static(path.join(__dirname, '/')))


app.get('/', function(req, res) {
  res.sendFile(__dirname+'/ajax.html')
})

app.listen(3000, function() {
  console.log('Example app listing on port 3000')
})