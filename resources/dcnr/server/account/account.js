addEventHandler("OnPlayerJoined", (event,client) => {
    resetPlayer(client);
	loadPlayer(client);
    fadeCamera(client, true);
});

addEventHandler("onPlayerQuit", (event, client, disconnectType) => {
    // update disconnectReason
    if(client.getData("loggedin")) {
        MySQL.query(`UPDATE players SET lastSeen = ${Math.floor(Date.now() / 1000)} WHERE playerid = ${client.getData("dbid")}`);
        MySQL.query(`UPDATE players SET disconnectReason = ${disconnectType} WHERE playerId = ${client.getData("dbid")}`);
    }
    resetPlayer(client);
});

function loadPlayer(client)
{
	let result = MySQL.query(`SELECT * FROM players WHERE username = '${MySQL.escapeString(client.name)}' LIMIT 1`).fetchAssoc();

	if(result) {
		// Player is registered
		messageClient("This account is registered. Please login with /login", client, toColour(255, 255, 255));
		client.setData("registered", true);

	}
	else {
		// Player is not registered
		messageClient("You are not registered. Please register with /register", client, toColour(255, 255, 255));
		client.setData("registered", false);
	}

	if(server.game == GAME_GTA_III) {
		spawnPlayer(client, [-362.94, 239.359, 60.654], 0, 2);
	}
	else if(server.game == GAME_GTA_VC) {
		spawnPlayer(client, [-592.0, 670.0, 11.0], 0, 2);
	}
	else if (server.game == GAME_GTA_SA) {
		spawnPlayer(client, [-711, 957, 12.4], 90/180*Math.PI, 182);
	}
	else if (server.game == GAME_GTA_IV) {
		spawnPlayer(client, [-1000, 1000, 0], 0, 1487004273);
	}
}

function resetPlayer(client) {
	client.setData("username", null);
	client.setData("dbid", null);
	client.setData("registeredTimestamp", null);
	
	
	client.setData("loggedin", false);
	client.setData("registered", false);
}
