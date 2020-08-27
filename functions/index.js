const functions = require('firebase-functions');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('CONNECTED!')
    socket.on('chat message', (msg) => {
        console.log(msg)
        io.emit('chat message', msg);
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});