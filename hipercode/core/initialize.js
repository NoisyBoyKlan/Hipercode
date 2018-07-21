global.port = NaN;
global.time = NaN;
global.comment = function(){};
global.startserver = function(){
	console.log("Server running on port "+port+".");
	var url = require('url');
	global.server = require('http').createServer(function (req, res) {
		var reqfile = url.parse(req.url, true).pathname;
		try {
			var content = require('../www/accessControl.hc')(reqfile);
			res.writeHead(200, {'X-Powered-By': 'hipercode v0.1 alpha'});
			console.log(" ["+req.connection.remoteAddress+"] "+req.url+" : "+200);
		} catch (exception) {
			//console.log(exception);
			var content = Buffer.from("<!DOCTYPE html><html><head><title>Hipercode</title></head><body><h1>404</h1><hr><p><i>Hipercode v0.1 alpha by hiperesp</i></p></body></html>", "utf-8");
			res.writeHead(404, {'X-Powered-By': 'hipercode v0.1 alpha'});
			console.log(" ["+req.connection.remoteAddress+"] "+req.url+" : "+404);
		}
		res.end(content, 'binary');
	}).listen(port);
};
global.closeserver = function(){
	console.log("The server will close in "+time+"ms.");
	setTimeout(function(){
		console.log("Closing server...");
		server.close();
	}, time);
};