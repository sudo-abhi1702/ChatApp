


const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const message=messageInput=document.getElementById('messageInp')

const messageContainer=document.querySelector('.container');
const audio = new Audio('wappTing.mp3');
const append=function(message,position){
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
     audio.play();
    }
}

form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const sentBox=document.querySelector('#messageInp').value;
    append(`You: ${sentBox}`,'right');
    socket.emit('send',sentBox);
    document.querySelector('#messageInp').value='';

})
let named =prompt("Enter your name");
console.log("new user",named);
socket.emit('new-user-joined',named);


socket.on('user-joined',name=>{
     let text=name+' joined the chat';
     append(text,'right')
});
socket.on('recieve',data=>{
    append(`${data.name}:${data.message} `,'left');
    
});
socket.on('left',name=>{
    append(`${name} left the chat`,'left');
});
