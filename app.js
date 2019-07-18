let http = require('http')
let ws = require('ws').Server
let server = http.createServer()

let wss = new ws({server: server})
let connection = []

let port = (process.env.PORT||3000);

wss.on('connection', (socket)=>{
  console.log('socket connected');

  socket.on('message', (data)=>{
    console.log(data);
    wss.clients.forEach((client)=>{
      client.send(data)
    })
  })

  socket.on('close', ()=>{
    console.log("dis")
  })
})

server.on('request', (req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/plane'})
  res.write('hello from node.js')
  res.end()
})

server.listen(port)
console.log('listen on port ' + port);
