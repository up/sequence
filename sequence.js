/*global process: false, module: false, console: false */

/**
 * main function from https://github.com/caolan/async
*/

var sequence = (function () {
  
  "use strict";

  var 
    nextTick, 
    sequences = {},
    empty = function () {}
  ;
  
  // nextTick implementation with browser-compatible fallback
  if (typeof process === 'undefined' || typeof process.nextTick === 'undefined') {
    nextTick = function (fn) {
      setTimeout(fn, 25);
    };
  }
  else {
    nextTick = process.nextTick;
  }

  /**
   * @private
  */
  function createRandomId() {
    return Math.floor(Math.random() * 0x100000).toString(16);
  }

  /**
   * @private
  */
  function iterator(tasks, id) {
    var callback;
    callback = function (index) {
      function fn() {
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      }
      fn.next = function () {
        if(index === tasks.length - 1){
          delete sequences[id];
        }
        return (index < tasks.length - 1) ? callback(index + 1) : null;       
      };
      return fn;
    };   
    return callback(0);
  }

  /**
   * @public
  */
  function pronto(tasks, callback) {
    
    var 
      iterate, 
      id = createRandomId()
    ;
    
    sequences[id] = [tasks, callback];
    
    callback = callback || empty;
    
    if (!tasks.length) {
      return callback();
    }
    
    iterate = function (iterator) {
      return function (err) {
                
        if (err) {
          callback(err);
          callback = empty;
        }
        else {
          var
            args = Array.prototype.slice.call(arguments, 1),
            next = iterator.next()
          ;
          
          if (next) {
            args.push(iterate(next));
          }
          else {
            args.push(callback);            
            
          }
          nextTick(function () {
            iterator.apply(null, args);
          });
        }
      };
    };
    iterate(iterator(tasks, id))();
  }

  /**
   * @public
  */
  function onDOMReady(tasks, callback) {
    var forlint = /in/.test(document.readyState) 
      ? setTimeout(function(){ 
          onDOMReady(tasks, callback); 
        }, 9) 
      : pronto(tasks, callback)
    ;   
  }

  /**
   * @public
  */
  function initSequence(id) {
    id = id || createRandomId();
    sequences[id] = {
      tasks: [],
      add: function(task){
        this.tasks.push(task);
      },
      run: function(cb){
        pronto(this.tasks, cb || empty);
      }
    };
    return sequences[id];      
  }

  return {
    pronto: pronto,
    lazy: onDOMReady,
    init: initSequence
  };

}());

if (typeof module !== 'undefined' && module.exports) {
  module.exports = sequence;
}