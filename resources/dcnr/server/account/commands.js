"use strict";

addEventHandler('OnPlayerCommand', (event, client, command, parameters) => {
    // if the player who isn't logged in tries to use a command other than /register or /login
	if(client.getData("loggedin") == false && command != "register" && command != "login") {
		messageClient("You must be logged in to use this command.", client, toColour(255, 255, 255));
		return false;
	}

	if(command == "register") {
		if(client.getData("registered") == true) {
			messageClient("You are already registered. Please login with /login", client, toColour(255, 255, 255));
			return true;
		}

		if(parameters.length == 0) {
			messageClient("Correct usage: /register [password]", client, toColour(255, 255, 255));
			return true;
		}

		if(parameters.length < 3) {
			messageClient("Password must be at least 3 characters long.", client, toColour(255, 255, 255));
			return true;
		}

		let result = MySQL.query(`SELECT * FROM players WHERE username = '${MySQL.escapeString(client.name)}' LIMIT 1`).fetchAssoc();

		// good to check again, just in case.
		if(!result) {
			// Player is not registered
			let hashPw = module.hashing.sha512(parameters); // hash the password
			MySQL.query(`INSERT INTO players (username, password, registeredTimestamp) VALUES ('${MySQL.escapeString(client.name)}', '${hashPw}', ${Math.floor(Date.now() / 1000)})`);
			messageClient("You have successfully registered. Please login with /login", client, toColour(255, 255, 255));
			client.setData("registered", true);
		}
		else {
			// Player is registered
			messageClient("This account is already registered. Please login with /login", client, toColour(255, 255, 255));
		}
	}

	if(command == "login") {
		if(client.getData("loggedin") == true) {
			messageClient("You are already logged in.", client, toColour(255, 255, 255));
			return true;
		}

		if(client.getData("registered") == false) {
			messageClient("You must be registered to login. Please register with /register", client, toColour(255, 255, 255));
			return true;
		}

		if(parameters.length == 0) {
			messageClient("Correct usage: /login [password]", client, toColour(255, 255, 255));
			return true;
		}

		if(parameters.length < 3) {
			messageClient("Password must be at least 3 characters long.", client, toColour(255, 255, 255));
			return true;
		}

		let hashPw = module.hashing.sha512(parameters); // hash the password
		let result = MySQL.query(`SELECT * FROM players WHERE username = '${MySQL.escapeString(client.name)}' AND password = '${hashPw}' LIMIT 1`).fetchAssoc();

		if(!result) {
			// Player is not registered
			messageClient("Invalid username or password.", client, toColour(255, 255, 255));
			return;
		}
		else {
			// Player is registered
			messageClient("You have successfully logged in.", client, toColour(255, 255, 255));
			
			client.setData("loggedin", true);
			client.setData("username", result["username"]);
			client.setData("dbid", result["playerId"]);
			client.setData("registeredTimestamp", result["registeredTimestamp"]);
			
			messageClient("You registered this account on timestamp: " + client.getData("registeredTimestamp"), client, toColour(255, 255, 255));
		}
	}
});
