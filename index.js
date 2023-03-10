const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Desconectou: ' + socket.id);
    });
    socket.on('infoUser', (info) => {
        socket.on('message', (message) => {
            const data = {
                nickname: info.nickname,
                mensagem: message,
                color: info.color
            }
            io.emit('showMessage', data);
        });
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