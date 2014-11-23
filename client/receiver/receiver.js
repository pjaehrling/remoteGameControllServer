/**
 * Remote Control Application
 * @module RC
 */
var RC = {};

/**
 * Constructor for Sender Class
 * @class Sender
 * @constructor
 * @namespace RC
 * @param {String} the socket server url
 */
RC.Receiver = function() {
    this.socket          = null;
    this.isConnected     = false;
};

RC.Receiver.prototype.initSocket = function(server_url, handleCB) {
    if (this.socket === null && this.isConnected === false) {
        this.socket = io.connect(server_url);
        this.socket.on('connected', function (data) {
            console.log(data);
            this.isConnected = true;
        });
        this.socket.on('cs', handleCB);
    }
};
