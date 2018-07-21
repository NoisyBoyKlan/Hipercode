module.exports = function(file){
	switch(file){
		case "/":
			requestfile = "/index.html";
			break;
		default:
			requestfile = file;
			break;
	}
	return require('fs').readFileSync('./www/public_html/'+requestfile);
};