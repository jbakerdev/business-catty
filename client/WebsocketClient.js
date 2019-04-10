import { ApiUrl } from '../Constants'

export default class WebsocketClient {

    setProps = (args) => {
      this.onConnected = args.onConnected
      this.onConnectionError = args.onConnectionError
      this.onWSMessage = args.onWSMessage
      this.launch(ApiUrl)
    }

    launch = (url) => {
        this.websocket = new ReconnectingWebSocket(url)
        console.log('ws: connecting');
        this.websocket.onopen = this.onConnected
        this.websocket.onerror = this.onConnectionError
        this.websocket.onmessage = (e) => {
            if(e){
                var data = JSON.parse(e.data);
                this.onWSMessage(data);
            }
        }
    }

    disconnect = () => {
        this.websocket.disconnect()
    }

    publishMessage= (msg) => {
      var message = JSON.stringify(msg)
      if(message) {
          this.websocket.send(message);
      }
    }
};

class ReconnectingWebSocket {

  constructor(url){
    this.url = url
    this.connect(this.url)
  }

  // These can be altered by calling code.
  debug = false;
  reconnectInterval = 2000;
  timeoutInterval = 5000;

  ws;
  forcedClose = false;
  timedOut = false;
  protocols = [];
  readyState = WebSocket.CONNECTING;

  onopen = function (event) {
  };

  onclose = function (event) {
  };

  onconnecting = function (event) {
  };

  onmessage = function (event) {
  };

  onerror = function (event) {
  };

  connect = (reconnectAttempt) => {
    this.ws = new WebSocket(this.url, []);
    this.onconnecting();
    var localWs = this.ws;

    var timeout = setTimeout(function () {
      this.timedOut = true;
      localWs.close();
      this.timedOut = false;
    }, this.timeoutInterval);

    this.ws.onopen = (event) => {
      clearTimeout(timeout);
      this.readyState = WebSocket.OPEN;
      reconnectAttempt = false;
      this.onopen(event);
    };

    this.ws.onclose = (event) => {
      clearTimeout(timeout);
      ws = null;
      if (forcedClose) {
        this.readyState = WebSocket.CLOSED;
        this.onclose(event);
      } else {

        this.readyState = WebSocket.CONNECTING;

        this.onconnecting();

        if (!reconnectAttempt && !timedOut) {
          this.onclose(event);
        }

        setTimeout(function () {
          this.connect(true);
        }, this.reconnectInterval);
      }
    };

    this.ws.onmessage = (event) => {
      this.onmessage(event);
    };

    this.ws.onerror = (event) => {
      this.onerror(event);
    };

  }

  send = (data) => {
    if (this.ws) {
      return this.ws.send(data);
    } else {
      throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
    }
  };

  close = () => {
    this.forcedClose = true;
    if (this.ws) {
      this.ws.close();
    }
  };

  /**

   * Additional public API method to refresh the connection if still open (close, re-open).

   * For example, if the app suspects bad data / missed heart beats, it can try to refresh.

   */

  refresh = () => {
    if (this.ws) {
      this.ws.close();
    }
  };
}