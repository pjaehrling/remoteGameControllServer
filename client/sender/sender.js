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
RC.Sender = function() {
    this.socket          = null;
    this.isConnected     = false;
    this.minSendInterval = 100;
    this.lastTimeSend    = new Date().getTime();
};

RC.Sender.prototype.initSocket = function(server_url) {
    if (this.socket === null && this.isConnected === false) {
        this.socket = io.connect(server_url);
        this.socket.on('connected', function (data) {
            console.log(data);
            this.isConnected = true;
        }.bind(this));
    }
};

RC.Sender.prototype.sendControlSignal = function(data) {
    if (this.socket !== null && this.isConnected) {
        var now = new Date().getTime();
        console.log(now - this.lastTimeSend + " >= " + this.minSendInterval);
        if (now - this.lastTimeSend >= this.minSendInterval) {
            this.socket.emit("cs", data);
            this.lastTimeSend = now;
        }
    }
};