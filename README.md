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

##File sizes
* Uncompressed: 706 bytes (391 bytes gzipped)
* Compressed: 335 bytes (220 bytes gzipped)