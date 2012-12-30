/*global exports: true, growl: true */

var time = 0;

function timer(action) {
  var start = new Date();
  if (time < 1 || action === 'start') {
    time = start;
  } else if (action === 'stop') {
    return start - time;
  }
}

var setTimer = function(next) {
  timer('start');
  next();
};

// NodeJS
// var sequence = require('./sequence.js').sequence;
if (typeof exports !== 'undefined') { 
  exports.setTimer = setTimer;
  exports.timer = timer;
}

// Browser notification with GrowlJS
var echo = function(msg, sticky){
  var config = {
	  head: msg,
	  position: 'top right',
	  path: 'growlnotify/'
  };
  if(sticky) {
	  config.sticky = true;
	  config.method = 'info';
	  config.body = msg;
	  config.head = 'Done!';
  } else {
	  config.timeout = 3000;
	  config.method = 'ok';
  }
	growl.notify(config);
};
