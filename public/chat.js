window.onload = function(){
   	//make connection
	var socket = io.connect('http://localhost:80')

	//buttons and inputs
	var message = document.getElementById('message');
	var username = document.getElementById("username")
	var send_message = document.getElementById("send_message")
	var send_username = document.getElementById("send_username")
	var chatroom = document.getElementById("chatroom")
	var feedback = document.getElementById("feedback")

	//Emit message
	send_message.onclick = function() {
		socket.emit('new_message', { message : message.value })
	}

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.innerHTML = '';
		message.value = '';
		const paragraph = document.createElement('p');
		paragraph.className = 'message';
		paragraph.innerText =  data.username + ": " + data.message 
		chatroom.appendChild(paragraph)
	})

	//Emit a username
	send_username.onclick = function(){
		socket.emit('change_username', { username : username.value })
	}

	//Emit typing
	message.addEventListener("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
};


