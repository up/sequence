/*global module: true, define: true, exports: true */

/**
 * Asynchronous processing of functions
 * https://github.com/up/sequence
 * copyright (c) 2011 Uli Preuss
 * MIT License
*/

var sequence = (function () {
  
  var cache = {};

  function run (tasks, callback) {

    var 
      num = 0, 
      fns = [],
      next, task
    ;

    if (tasks.length === 0) {
      return callback();
    }
    
    next = function() {
      tasks[num++](task);
    };
    
    task = function(fn) {
      fns[num] = fn;
      if (num === tasks.length && callback) {
        callback.apply(fns, fns);
      } else {
        next();
      }
    };
    
    next();
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
