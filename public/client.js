let messagearea = document.querySelector(".message_area");
const socket = io();
let name;
let textarea = document.querySelector("#textarea");

do {
  name = prompt("please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    auhtorizationMessage(e.target.value);
    e.target.value = "";
  }
});

function auhtorizationMessage(message) {
    if (message == "") {
        console.log("unable to send this message")
    } 
    else{
        let msg = {
            user: name,
            message: message.trim(),
          };
          sendMessage(msg)
    }
}

function sendMessage(msg) {
    appendMessage(msg, "outgoing");
    scrollToBottom()
    //Socket
    socket.emit("message",msg)
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "messagearea");
  mainDiv.style.padding = "20px";
  mainDiv.style.marginBottom = "20px";
  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;
  messagearea.appendChild(mainDiv);
}

//Receive message
socket.on('message',(msg)=>{
    appendMessage(msg, 'incoming') 
    scrollToBottom()
    console.log(msg);
})


// function to scroll on the bottom

function scrollToBottom(params) {
    messagearea.scrollTop = messagearea.scrollHeight
}