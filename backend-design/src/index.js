const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const auth = require('./auth')();

//toda nova conexão via web socket com nosso backend sera 'escutada'
io.on('connection', socket => {
    
})

//conexão com o banco
mongoose.connect('mongodb+srv://mzardo:mzardo@cluster0-lmor3.mongodb.net/design-study?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(auth.initialize());

app.use((req, res, next) => {
    req.io = io
    return next();
})

app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(3333);
