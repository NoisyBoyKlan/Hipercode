function cmd(command, args){
	if(typeof defaultCmds[command]=="string") {
		if(typeof args=="undefined"||args=="") {
			eval(command+"()");
			return true;
		} else {
			switch(typeof eval(command)) {
				case "number":
					eval(command+' = '+parseInt(args));
					break;
				case "string":
					eval(command+' = "'+args+'"');
					break;
				case "function":
					//eval(command+"('"+args+"')");
					eval(command+"()");
					return true;
				default:
					console.log("Tipo de argumento não encontrado (linha 12 de hipercode.js): "+command+"=>\""+typeof eval(command)+"\"");
					break;
			}
			var returnString = '"'+command+'" = "'+args+'" ';
			if(args!==defaultCmds[command]){
				returnString = returnString+'( def. "'+defaultCmds[command]+'" )';
			}
		}
		console.log(returnString);
	} else {
		console.log('Unknown command "'+command+'"');
	}
	return true;
}
function exec(file) {
	require('readline').createInterface({
		input: require('fs').createReadStream(file)
	}).on('line', function (line) {
		var commands = line.split(";");
		for(str in commands){
			var command = commands[str].split(" ")[0];
			var args = commands[str].split(" ");args.shift();
			var args = args.join(' ');
			if(command!="comment"){
				console.log("] "+command+" "+args);
			}
			cmd(command, args);
		}
	});
}

var defaultCmds = {};

require("./core/initialize.js");

require('readline').createInterface({
	input: require('fs').createReadStream("core/defaults.cfg")
}).on('line', function (line) {
	var commands = line.split(";");
	for(str in commands){
		var command = commands[str].split(" ")[0];
		var args = commands[str].split(" ");args.shift();
		var args = args.join(' ');
		defaultCmds[command] = args;
	}
}).on('close', function () {
	exec("hipercode.cfg");
});

