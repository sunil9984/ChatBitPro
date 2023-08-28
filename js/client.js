const socket = io('http://localhost:8765');

const form=document.getElementById('send_container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");  

var audio = new Audio('Single Beep.mp3');
//message population in the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    
}
// if the form is submitted and let the server know first and then broadcast the other
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const essage = messageInput.value;
    append(`You:${message}`,right);
    socket.emit('send',message);
    messageInput.value='';
})


//allow to new user entry by submitting the name.
const name = prompt("Type your name to join");
socket.emit('new-user-joined', name);

//telling the main server that new user is joined the chatroom ant it is told by server to the others
socket.on('user-joined',name=>{
    append(`${name} is online to chat`,right);
})

//message recieving event.
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,left);
})

//if user if left the chatroom tell the people by appending the container.
socket.on('left',name=>{
    append(`${name}: left the chat`,right);
})



