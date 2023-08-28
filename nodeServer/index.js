//nodeServer which will handle socket io connections
const io=require('socket.io')(8765);

//container for all the users
const users={};

//connection event
io.on('connection',socket=>{
    //if a new user is joined is work is to connect the people through server 
    socket.on('new-user-joined',name=>{
        console.log("New user",name);
        // for a new users a new id is generated and value will be user's name
        users[socket.id]=name;
        //telling the all earlier joined people about new commers
        socket.broadcast.emit('user-joined',name);
    });

    // for broadcasting  the msg  send-event to the others 
    socket.on('send',message=>{
        //when a send event is invoked then recieve will occur and recieve event will make message along the user id and name
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
    // if someone left the chatting pannel then disonnect it. and let to inform the others , self fired built function.
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})

