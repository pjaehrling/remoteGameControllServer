/**
 * Constructor for OrientationSender Class
 * @class OrientationSender
 * @constructor
 * @namespace RC
 */
RC.OrientationSender = function() {
    this.hasDeviceOrientation = "ondeviceorientation" in window;

    this.alpha    = 0;
    this.beta     = 0;
    this.gamma    = 0;
};
RC.OrientationSender.prototype = new RC.Sender();

RC.OrientationSender.prototype.start = function() {
    if (this.hasDeviceOrientation) {
        // TODO: brings up "object is not a function" in Ripple, but it should work
        //window.addEventListener("deviceorientation", this, false);
        window.addEventListener("deviceorientation", this.deviceorientation.bind(this), false);
    }
};

RC.OrientationSender.prototype.stop = function() {
    if (this.hasDeviceOrientation) {
        // TODO: stop is not working, neither with this nor with the function 
        //window.removeEventListener("deviceorientation", this, false);
        //window.removeEventListener("deviceorientation", this.deviceorientation, false);
    }
};
 
RC.OrientationSender.prototype.deviceorientation = function(event) {
    this.alpha  = event.alpha;
    this.beta   = event.beta;
    this.gamma  = event.gamma;

    this.sendControlSignal({alpha: this.alpha, beta: this.beta, gamma: this.gamma});
    
    var now = new Date().getTime();
    console.log(now + " - " + this.toString());
};

RC.OrientationSender.prototype.toString = function() {
    return "alpha:" + this.alpha +
        ", beta:" + this.beta +
        ", gamma:" + this.gamma;
};