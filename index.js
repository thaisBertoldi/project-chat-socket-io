const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('X desconectou: ' + socket.id);
    });
    socket.on('message', (data) => {
        socket.emit('showMessage', data);
    });
})

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

http.listen(3000, () => {
    console.log('Rodando');
});