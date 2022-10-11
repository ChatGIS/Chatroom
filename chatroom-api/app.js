const http = require('http');
const Koa = require('koa');
const WebSocket = require('ws');

const app = new Koa();
const httpServer = http.createServer(app.callback())
// 选项"port", "server", 或者 "noServer"
const wss = new WebSocket.Server({
    server: httpServer
});

// wss对象添加方法broadcast，用于将信息发送给各客户端
wss.broadcast = function (msg) {
    wss.clients.forEach(client => {
        client.send(msg.toString());
    }) 
};

wss.on('connection', wsReq => {
    console.log('server connection');
    wsReq.on('message', msg => {
        wss.broadcast(msg)
    });  
});


httpServer.listen(3008, () => {
    console.log("chatroom-api服务器已启动，端口3008");
})