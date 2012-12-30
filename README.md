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

#####Example

```javascript
sequence.run(
  [
    function(next){
      setTimeout(function() {
        console.log("Test A Complete");
        sequence.cache.test = "from Test A";
        next();
      }, 1000);
    },
    function(next){
      console.log("Funktion A Complete");
      next();
    }
  ], 
  function () {
    console.log('done); 
  }
);
```

##File sizes
* Uncompressed: 706 bytes (391 bytes gzipped)
* Compressed: 335 bytes (220 bytes gzipped)