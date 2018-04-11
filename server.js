var staticServer = require('static-server');

var server = new staticServer({
	rootPath:'./dist/',
	port:80
});

server.start(function() {
	console.log('Starting the server on port', server.port);
})