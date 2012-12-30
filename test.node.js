/*global sequence: true, require: true, console: true */

var 
  sequence = require('./sequence.js').sequence,
  helper = require('./helper.js'),
  setTimer = helper.setTimer,
  timer = helper.timer
;

function taskA(next) {
  setTimeout(function() {
    console.log("Task A completed");
    sequence.cache.test = "Hi from Task A!";
    next();
  }, 1000);
}

function taskB(next) {
  setTimeout(function() {
    console.log("Task B: " + sequence.cache.test);
    console.log("Task B completed");
    next();
  }, 2500);
}

function callback() {
  console.log("Sequence completed in " + timer('stop') + " msec", true);
}

// Example 1
sequence.run( [ setTimer, taskA, taskB, taskA ], callback );

/*
// Example 2
sequence.run(
  [
    setTimer,
    function(next){
      setTimeout(function() {
        console.log("Task A completed.");
        sequence.cache.taskA = "from Task A";
        next();
      }, 1000);
    },
    function(next){
      setTimeout(function() {
        console.log("Task B completed.");
        console.log(sequence.cache.taskA);
        next();
      }, 1000);
    }
  ], 
  callback
);
*/

/*
// parallel / 'normal' calls
var next = function(){};
setTimer(next);
taskA(next);
taskB(next);
taskA(next);
callback(next);
*/
