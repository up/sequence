/*global module: true,  define: true */
/**
  * https://github.com/jgallen23/resistance
  * copyright JGA 2011
  * MIT License
  */

var sequence = (function () {
  
  var cache = {};

  function runTasks (tasks, callback) {

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
    run: runTasks,
    cache: cache
  };

}());

if (typeof module !== 'undefined' && module.exports) {
  module.exports = sequence();
} else if (typeof define === 'function' && typeof define.amd === 'object') {
  define(sequence);
} 
