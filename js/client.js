const socket = io('http://localhost:8000');


//  get DOM elements in  respective js variable
const form = document.getElementById('send-conatiner');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector(".container")
// Audio that will play on recieving message  
var audio= new Audio('we.mp3');

// Function  which will append event  info to the container   class in  index.html
const append =(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }
}

// Asking new user for his/her name  and let the server know 
const name1 = prompt("Enter you name to join");
socket.emit('new-user-joined',name1);

//  if a new user joins , receive his/her name from the server
socket.on('user-joined',name1=>{
    append(`${name1} joined the chat`,'right');
});
//  if a server send a message , receive it
socket.on('receive',data=>{
    append(`${data.name2}: ${data.message2}`,'left');
});
//  if a user leaves the chat, append the info to the container
socket.on('left',name2=>{
    append(`${name2}: left the chat`,'left');
});

// if the form gets submitted ,send server the message 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value="";
    
    })
    