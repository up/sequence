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
    function(callback){
      setTimeout(function(){
        // code for task 1
        callback(null, 'first');
      }, 3000);
    },
    function(callback){
      // code for task 2
      callback(null, 'done');
    }
  ], 
  function (err, result) {
    console.log('first: ' + result); 
  }
);
```

##File sizes
* Uncompressed: 706 bytes (391 bytes gzipped)
* Compressed: 335 bytes (220 bytes gzipped)