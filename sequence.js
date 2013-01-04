/*global module: true, define: true, exports: true */

/**
 * Simple asynchronous processing of functions
 * https://github.com/up/sequence
 * copyright (c) 2012 Uli Preuss
 * MIT License
*/

var sequence = (function () {
  
  var cache = {};

  function run (tasks, callback) {

    var 
      num = 0, 
      fns = []
    ;

    function isArray(obj) {
      if (obj.constructor.toString().indexOf('Array') === -1) {
        return false;
      }
      else {
        return true; 
      }
    }
    
    function next() {
      function task(fn) {
        fns[num] = fn;
        if (num === tasks.length && callback) {
          callback.apply(fns, fns);
        } else {
          next();
        }
      }
      tasks[num++](task);
    }
        
    if(arguments.length === 0) {
      return; //no tasks, no callback
    } else if (arguments.length === 1 && !isArray(tasks)) {
      tasks(); // no tasks, only callback
    } else if (arguments.length === 2 && isArray(tasks) && tasks.length === 0) {
      callback(); // empty task array, only callback
    } else {
      next();  
    }
    
  }

  return {
    run: run,
    cache: cache
  };

}());

// NodeJS
// var sequence = require('./sequence.js').sequence;
if (typeof exports !== 'undefined') { 
  exports.sequence = sequence;
} 
