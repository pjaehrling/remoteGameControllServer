/**
 * Constructor for OrientationSender Class
 * @class OrientationSender
 * @constructor
 * @namespace RC
 */
RC.OrientationSender = function() {
    this.hasDeviceMotion = 'ondevicemotion' in window;
    this.acceleration = null;
    this.rotationRate = null;

    window.addEventListener("devicemotion", this.handleMotion.bind(this), true);
};
//RC.OrientationSender.prototype = new RC.Sender();

RC.OrientationSender.prototype.handleMotion = function(event) {
    this.acceleration = event.acceleration;
    this.rotationRate = event.rotationRate;
    
    var now = new Date().getTime();
    console.log(now + " - " + this.toString());
};

RC.OrientationSender.prototype.toString = function() {
    return "acceleration:" + this.acceleration.x + "/" + this.acceleration.y + "/" + this.acceleration.z +
        ", rotationRate:" + this.rotationRate.alpha + "/" + this.rotationRate.beta + "/" + this.rotationRate.gamma;
};