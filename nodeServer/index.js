const io = require('socket.io')(3000, {
    cors:{
        origin: '*',
    }
});


const users = {};

io.on('connection', socket => {
    //getting message from server
    //on join new user
    socket.on('new-user-joined', Name => {
        console.log("new user", Name)
        users[socket.id] = Name;
        socket.broadcast.emit('user-joined', Name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, Name: users[socket.id]});
    });


    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
    
});







  