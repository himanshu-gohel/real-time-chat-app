const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginput');
const msgContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
    msgContainer.scrollTop = msgContainer.clientHeight;
    if (position == "left") {
        audio.play();
    }
} 

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})

const name= prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', name => {
    append(`${name} left the chat`, 'left');
})
