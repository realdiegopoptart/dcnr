"use strict";

function respawnPlayer(client)
{
	if (server.game == GAME_GTA_III)
	{
		let skin = Math.floor(Math.random() * 78);
		if (skin >= 26)
			skin += 4;
		spawnPlayer(client, [-362.94, 239.359, 60.654], 0, skin);
	}
	else if (server.game == GAME_GTA_VC)
	{
		let skin = 0;
		spawnPlayer(client, [-592.0, 670.0, 11.0], 0, skin);
	}
	else if (server.game == GAME_GTA_SA)
	{
		spawnPlayer(client, [-711, 957, 12.4], 90/180*Math.PI, 182);
	}
    else if (server.game == GAME_GTA_IV)
    {
        spawnPlayer(client, [-1000, 1000, 0], 0, 1487004273);
    }
}

bindEventHandler("OnResourceStart", thisResource, (event,resource) => {
	if (server.game == GAME_GTA_III)
	{
		let car = gta.createVehicle(101, new Vec3(-366.94, 239.359, 62.654));
	}
});

addEventHandler("OnPlayerJoined", (event,client) => {
    respawnPlayer(client);
    fadeCamera(client, true);
});
