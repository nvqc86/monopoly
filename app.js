var fs = require('fs');
var writeJSONObject = function(jsonObj) {
	if (!fs.existsSync("database")){ fs.mkdirSync("database"); }
	fs.writeFile("database/" + jsonObj.name + "_data.json", JSON.stringify(jsonObj), function(err) {
	    if(err) { return console.log(err); }
	    //console.log("The file was saved!");
	});
}
var loadJSONObject = function(fileName) {
	var data = fs.readFileSync(fileName, 'utf8');
	return JSON.parse(data);
}

var database;

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

console.log("1. Initialize database for first use");
console.log("2. Continue working with existing database");

rl.setPrompt('Input: ');
rl.prompt();
rl.on('line', (line) => {
	switch(line.trim()) {
		case "1": 
			//load initialize database
			database = require("./init_database.js");

			//write each object in database to files
			for (var i = 0; i < database.length; i++) {
				writeJSONObject(database[i]);
			}

			console.log("set up completed!")
			break;
		case "2": 
			if (fs.existsSync("database")) {
				console.log("load complete!");
			}
			break;
		case "quit": 
		case "exit": 
			console.log('app closing...');
			process.exit(0);
		default:
			var inputString = line.trim().toUpperCase();
			var firstChar = inputString.substring(0, 1).toLowerCase();
			if (firstChar == "?"){
				firstChar = "-";
				inputString = firstChar + inputString.substring(1, inputString.length);
			} 
			var fileName = firstChar + "_data.json";
			
			//Load file for editing
			var jsonObj = loadJSONObject("./database/" + fileName);
			//edit
			jsonObj[inputString] = parseInt(jsonObj[inputString]) + 1;
			//save
			writeJSONObject(jsonObj);
			break;
	}

	rl.prompt();
}).on('close', () => {
	console.log('app closing...');
	process.exit(0);
});