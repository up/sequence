#Sequence

Asynchronous processing of functions

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
        console.log("Funktion A Complete");
        sequence.cache.testA = "from Funktion A";
        next();
      }, 1000);
    },
    function(next){
      setTimeout(function() {
        console.log("Funktion B Complete");
        console.log(sequence.cache.testA);
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
var testA = function(next) {
  setTimeout(function() {
    console.log("Test A Complete");
    sequence.cache.test = "from Test A";
    next();
  }, 1000);
};

var testB = function(next) {
  setTimeout(function() {
    console.log("Test B Complete");
    console.log(sequence.cache.test);
    next();
  }, 1000);
};

var callback = function() {
  console.log("Sequence complete in " + timer('stop') + " msec");
};

sequence.run( [ testA, testA, testA, testA, testB ], callback );
```

##File sizes
* Uncompressed: 706 bytes (391 bytes gzipped)
* Compressed: 335 bytes (220 bytes gzipped)

##Tests

* `test.browser.htm`
* `$ node test.node.js`

