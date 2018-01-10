//https://medium.freecodecamp.org/javascript-callbacks-explained-using-minions-da272f4d9bcd
//I will try writing the code minionfied ..to use callback !

var http = require('http');
var url= require('url');
var fs= require('fs');
var cb=require('coinbase');
var client   = new cb.Client({'apiKey': 'abc', 'apiSecret': 'mysecret'});
var sleep=require('system-sleep');
var replace=require('replace');
var price_g=000;
var htm_data="";
http.createServer(function (req, res) { //minion1
	    var urlObj=url.parse(req.url,true);	
		var pagename="."+urlObj.pathname;
		
		function getPrice(callback){
			client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, obj) { //minion3
		    	console.log('I am getting bitcoin price');
		    	//sleep(2000);
		    	price_g=obj.data.amount;
		    	//console.log(price_g);
		    	console.log('getBuyPrice..ending');
		    	callback();
	        });
	        
	    }


	    function readFFile(callback){
 
			fs.readFile(pagename,'utf8',function (err,data){//It could have been readFileSync //minion2
		    if(err){
		    	res.writeHead(404, {'Content-Type': 'text/html'});
	            return res.end("404 Not Found");
		    }
		    console.log('I am reading file');
	        data=data.replace('Price',price_g);
	        htm_data=data;
	        console.log(htm_data);
	        console.log('Read file ending');
	        callback();
			});
			
        }

		function populate(callback){
			console.log('I am populating everything')
	        res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(htm_data);
			//res.write('\n');
			//res.write('The final Price of bitcoin is...'+price_g);
			callback();
	    }

	    function runAllFunctions(callback) {//callback function is called when getPrice is done
            getPrice(function() { //readFile is called when getPrice is done
                readFFile(function() { //populate is done when readfile is done
                    populate(callback);
                });
            });
        }

        runAllFunctions(function(){
        	res.end();
        });
        
    
}).listen(8080); //server listen at 8080
