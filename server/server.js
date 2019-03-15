var WebSocketServer = require('websocket').server;
var http = require('http');
var Constants = require('../Constants.js').ReducerActions

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
var sessions = [];

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
        var obj = JSON.parse(message.utf8Data)
        var targetSession = sessions[obj.sessionName]
        switch(obj.type){
          case Constants.MATCH_AVAILABLE:
            if(targetSession){
              targetSession.players.push({...obj.currentUser, socket: connection})
            }
            else
              targetSession = {
                players: [{...obj.currentUser, socket: connection}], 
                sessionName: obj.sessionName
              }
            break
          case Constants.MATCH_START: 
            targetSession.isStarted = true
            break
        }
        sessions[obj.sessionName] = targetSession
        publishSessionUpdate(targetSession)
    }
  });

  // user disconnected
  connection.on('close', (code) => {
      console.log((new Date()) + "A Peer disconnected.");
      // remove user from the list of connected clients
      var socket = clients[index]
      var sessionNames = Object.keys(sessions)
      sessionNames.forEach((name) => {
        let session = sessions[name]
        let player = session.players.find((player) => player.socket === socket)
        if(player){
          console.log('removing player '+player.name+' from session '+name)
          session.players = session.players.filter((rplayer) => rplayer.id !== player.id)
          publishSessionUpdate(session)
        } 
      })
      
      clients.splice(index, 1);
      // remove user from sessions and send update
  });

  var publishSessionUpdate = (targetSession) => {
    var message = getSessionUpdateMessage(targetSession)
    // broadcast message to clients of session
    var json = JSON.stringify({ type:'message', data: message });
    targetSession.players.forEach((player) => {
        console.log((new Date()) + ' ' + message);
        player.socket.sendUTF(json);
    })
  }

  var getSessionUpdateMessage = (targetSession) => {
    return JSON.stringify({
      type: Constants.MATCH_UPDATE,
      session: {...targetSession, players: targetSession.players.map((player) => {return {...player, socket: ''}})}
    })
  }

});