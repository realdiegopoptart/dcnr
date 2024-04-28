let mysql_info = JSON.parse(loadTextFile("database.json")); // Load MySQL info from json file
var MySQL = null; // MySQL connection instance

bindEventHandler("OnResourceStart", thisResource, (event, resource) => { 
	if(resource != thisResource) return false;

	MySQL = module.mysql.connect(mysql_info.host, mysql_info.user, mysql_info.password, mysql_info.database, mysql_info.port);

	if(MySQL.error) {
		//  Database connection failed connecting
		console.error("[dcnr] MySQL Error: "+MySQL.error+" ("+MySQL.errorNum+")");
		return false;
	} else {
		setInterval(() => {
		
			if(!MySQL.ping) {
				console.error("[dcnr] MySQL Error: "+MySQL.error+" ("+MySQL.errorNum+")");
				console.error("[dcnr] Trying to reconnect to the MySQL database...");
	
				if(!this.MySQLconnect()) {
					console.error("[dcnr] Failed to reconnect to database. Shutting down server...");
					consoleCommand("quit");
				}
				return;
			}

		}, 15000);
		console.log("[dcnr] MySQL connection established.");
		return true;
	}

});

addEventHandler("onResourceStop", (event, resource, stoppingForRestart) => {
	MySQL.close();
});
