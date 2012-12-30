#Sequence

Simple asynchronous processing of functions

![Support for browser and node.js](https://raw.github.com/up/sequence/master/test/support.png)

##Methods

###sequence.run

#####Syntax

```javascript
sequence.run(tasks [, callback ]);
```
@param tasks {Array} Series of functions    
@param callback {Function} Callback function (optional)

#####Example 1

```javascript
sequence.run(
  [
    function(next){
      setTimeout(function() {
        console.log("Task A Complete");
        sequence.cache.taskA = "from Task A";
        next();
      }, 1000);
    },
    function(next){
      setTimeout(function() {
        console.log("Task B: " + sequence.cache.taskA);
        console.log("Task B Complete");
        next();
      }, 1000);
    }
  ], 
  function () {
    console.log('Sequence complete'); 
  }
);
```

#####Example 2

```javascript
var taskA = function(next) {
  setTimeout(function() {
    console.log("Task A Complete");
    sequence.cache.test = "from Task A";
    next();
  }, 1000);
};

var taskB = function(next) {
  setTimeout(function() {
    console.log("Task B: " + sequence.cache.test);
    console.log("Task B Complete");
    next();
  }, 1000);
};

var callback = function() {
  console.log("Sequence complete in " + timer('stop') + " msec");
};

sequence.run( [ taskA, taskA, taskA, taskA, taskB ], callback );
```

##File sizes
* Uncompressed: 748 bytes (428 bytes gzipped)
* Compressed: 264 bytes (197 bytes gzipped)

##Tests

* `test/test.browser.htm`
* `$ node test/test.node.js`

