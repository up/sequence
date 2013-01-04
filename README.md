#Sequence

Asynchronous processing of functions

![Support for browser and node.js](https://raw.github.com/up/sequence/master/test/support.png)

##Usage

#####Syntax

```javascript
sequence(tasks [, callback ]);
```
@param tasks {Array} Series of functions    
@param callback {Function} Callback function (optional)

#####Example 1

```javascript
var cache = {};
sequence(
  [
    function(next){
      setTimeout(function() {
        console.log("Task A completed");
        cache.taskA = "from Task A";
        next();
      }, 1000);
    },
    function(next){
      setTimeout(function() {
        console.log("Task B: " + cache.taskA);
        console.log("Task B completed");
        next();
      }, 1000);
    }
  ], 
  function () {
    console.log('Sequence completed'); 
  }
);
```

#####Example 2

```javascript
var cache = {};
var taskA = function(next) {
  setTimeout(function() {
    console.log("Task A completed");
    cache.taskA = "from Task A";
    next();
  }, 1000);
};

var taskB = function(next) {
  setTimeout(function() {
    console.log("Task B: " + cache.taskA);
    console.log("Task B completed");
    next();
  }, 1000);
};

var callback = function() {
  console.log("Sequence completed in " + timer('stop') + " msec");
};

sequence( [ taskA, taskA, taskA, taskA, taskB ], callback );
```

##File sizes
* Uncompressed: 1KB (510 bytes gzipped)
* Compressed: 363 bytes (250 bytes gzipped)

##Tests

* `test/test.browser.htm`
* `$ node test/test.node.js`

