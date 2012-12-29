#Sequence

Asynchronous processing of functions

##Methods

###sequence.pronto

####Syntax

```javascript
sequence.pronto(tasks [, callback ]);
```

####Example

  sequence.pronto(
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
  

###sequence.lazy

####Syntax

  sequence.lazy(tasks [, callback ]);

####Example

  sequence.lazy(
    [
      function(callback){
        setTimeout(function(){
          callback(null, 'one', 'two');
        }, 1000);
      },
      function(arg1, arg2, callback){
        setTimeout(function(){
          callback(null, 'two');
        }, 500);
      },
      function(arg1, callback){
        // arg1 now equals 'three'
        callback(null, 'three');
      }
    ], 
    function (err, result) {
      console.log('second: ' + result);
    }
  );

###sequence.init

####Syntax

  var mySeq = sequence.init(["Id"]);

####Example

  var mySeq = sequence.init();

  var mySeq = sequence.init('mySeq');

####[mySeq].add

  mySeq.add(function(callback){ 
    // code for task 1
    callback();
  });
  mySeq.add(function(callback){ 
    // code for task 2
    callback();
  });

####[mySeq].run

  mySeq.run(function(callback){ 
    console.log('done');
  });

##File sizes
* Uncompressed: 2.02KB (836 bytes gzipped)
* Compressed: 999 bytes (525 bytes gzipped)