var http = require('http');
var datte= require('./myfirstmodule.js'); //"./" is important..it tells to look for the module in same location
var url= require('url');//module to split the requested url for params and stuff !
//creating server by calling createServer function of node.js
http.createServer(function (req, res) { //req is the url connecting to the server
	//writeHead arguments::::: 200 means that all is OK, the second argument is an object containing the response headers.
    res.writeHead(200, {'Content-Type': 'text/plain'});
		//var q = url.parse(req.url, true).query;
		var parseParams=url.parse(req.url,true).query;
		var params = parseParams.year + " " + parseParams.month;
		res.write(params);
		res.write('\n');
		res.write("The present dat and tym I am getting from module is::"+datte.myDateTym());
		res.write('\n');
    res.end('Hello World!'); //ending the response
}).listen(8080); //server listen at 8080
