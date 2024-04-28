addEventHandler("onPlayerChat", (event, client, string) => {
	event.preventDefault(); // prevent defaut chat message from being sent
	

	if(client.getData("loggedin") == false) {
		return messageClient("You must be logged in to chat.", client, toColour(255, 255, 255));
	}

	message(`${client.name}: ${string}`, toColour(255, 255, 255));
	return true;
});
