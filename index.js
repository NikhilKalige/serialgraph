var http = require('http');
var path = require('path');
var fs = require('fs');
var util = require('util');
var Socket = require('socket.io');
var Serial = require('./server/serialSocket');

var port = 8000;
var __dirname = './';

//helper function handles file verification
function getFile(filePath, res, page404){
    //does the requested file exist?
    fs.exists(filePath, function(exists){
        //if it does...
        if(exists){
            //read the fiule, run the anonymous function
            fs.readFile(filePath, function(err, contents){
                if(!err){
                    //if there was no error
                    //send the contents with the default 200/ok header
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                }
            });
        }
        else {
            console.log('Error serving ' + filePath);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        }
    });
}

//a helper function to handle HTTP requests
function requestHandler(req, res) {
    if(req.url.substr(-1) == '/')
        req.url = req.url.substr(0, req.url.length - 1);

    // remove query string
    req.url = req.url.split('?')[0];
    var fileName = req.url || '/index.html';
    var localFolder = path.join(__dirname, '/public');
    var page404 = localFolder + '404.html';

    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found
    getFile((localFolder + fileName), res, page404);
}

var server = http.createServer(requestHandler);
var io = Socket(server);
server.listen(port);

console.log('Server running at http://127.0.0.1:' + port);

io.on('connection', function (socket) {
    Serial.list(socket);
    Serial.connect(socket);
    Serial.close(socket);
});
