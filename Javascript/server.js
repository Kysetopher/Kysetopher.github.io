
const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

const port = 8080; 
const host ='127.0.0.1';

app.use(express.static(__dirname + '\processing.js'))

 
function sendFile(response, fileName, contentType) {

  fs.readFile(fileName, (err, data) => {
    if(err){
      response.writeHead(404);
      console.error(err);
    }
    else{
      response.writeHead(200, {'Content-Type': contentType});
      response.write(data);
    }
    response.end();
  });
}

(function writeJson( fileName) {
	

	fs.readdir("Objects", (err, data) =>  {
        if (err) console.error(err);
		else {
			var txt = '{ "Items" :[   ' ;
			for(var i = 0; i < data.length; i++){
					if (i != 0) txt += ",";
					txt += '"' + data[i].split('.')[0] + '"';
			}
			
			txt += ' ] }';
			
			var jsonObj = JSON.stringify(txt);
			console.log(txt);
			
			fs.writeFile(fileName, JSON.parse(jsonObj), (err) => {
		
				if(err) console.error(err);
			});
		}
    });

}("objects.json"));

const server = http.createServer( ( rqst, rspn ) => {

		if(/^\/[a-zA-Z0-9\/]*.css$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "text/css");
			
		} else if(/^\/[a-zA-Z0-9\/]*.html$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "text/html");
			
		} else if(/^\/[a-zA-Z0-9\/]*.js$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "text/javascript");
			
		} else if(/^\/[a-zA-Z0-9\/]*.pde$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "text/processing");
			
		} else if(/^\/[a-zA-Z0-9\/]*.png$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "img/png");
			
		} else if(/^\/[a-zA-Z0-9\/]*.jpeg$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "img/jpeg");
			
		} else if(/^\/[a-zA-Z0-9\/]*.json$/.test(rqst.url.toString())){
			sendFile(rspn, rqst.url.toString().substring(1), "txt/json");
			
		} else {
		
			switch(rqst.url.toString()){
			case '/':
				sendFile(rspn, 'index.html', "text/html");
				break;
			default :
				sendFile(rspn, rqst.url.toString().substring(1), "text/javascript");
				console.log("sent:"+ rqst.url.toString());
			}	
		}

		

		

	
}).listen( port , host , () => {

});

console.log('Server started on port: ' + port);