var WebSocketServer = require('websocket').server;
var http = require('http');

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(1337, function() {
  console.log((new Date()) + " Server is listening on port " + 1337);
});

/**
 * WebSocket server
 */

var clients = [];

var wsServer = new WebSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket request is just
  // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.host + '.');
  
  // accept connection - you should check 'request.origin' to make sure that
  // client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;

  console.log((new Date()) + ' Connection accepted.');

  // user sent some message
  connection.on('message', function(message) {
    if (message.type === 'utf8') { // accept only text
        // broadcast message to all connected clients except self
        var json = JSON.stringify({ type:'message', data: message });
        for (var i=0; i < clients.length; i++) {
          if(clients[i].socket.remotePort !== connection.socket.remotePort){
            console.log((new Date()) + ' ' + message.utf8Data);
            clients[i].sendUTF(json);
          }
          else console.log('message to self was ignored')
        }
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer "
      + connection.socket.remotePort + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
  });

});