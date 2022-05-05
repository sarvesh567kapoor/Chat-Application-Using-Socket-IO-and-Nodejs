
//  node server  which will handle socket io connection
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users = {};
// console.log("hello");
io.on("connection",(socket)=>{
    // If any new user joins ,let the other users connected to the server know
    socket.on('new-user-joined',name2 =>{
        console.log("new-user",name2);
        users[socket.id]=name2;
        // emit the new-user-joined event to /js/client.js
        socket.broadcast.emit('user-joined',name2)
    });
    // if someone  sends a mesage, broadcast it to other users
    socket.on('send', message=>{
        // emit the send event to /js/client.js
        socket.broadcast.emit('receive',{message2: message,name2:users[socket.id]})
    });
    
    // if someone left the connection let other users know

    socket.on('disconnect', message=>{
        // the disconnect is  a predefiend event in socket io 
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});