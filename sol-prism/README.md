# Warp Prism


## How to use
`npm install -g sol-prism`  

### Generate Common Data Structures & Unit Test File    
`warpin doublyLinkedList data-structures`  

`cd data-structures`  

`warpin trie .`  


### Generate Custom Objects, specify directory later
`warpin employee`  

`warpin manager`

`cd campus-matrix`  

`ls -l` 

**Most importantly these js models are ready for testing immediately**  
`mocha employee.spec.js`  
```


  Employee constructor
    Prototype methods
      ✓ should say hello


  1 passing (7ms)


```

### Provides flexibility for opinionated devs 
**Lets say you start with some boiler plate code at dir /Server/**
```  
warpin index api --object
warpin user api/user --class
warpin post api/post --class
warpin localAuth api/user/auth --function 
warpin googleAuth api/user/auth --f 
```
**Generates this structure**  
/Server/    
--/api/   
----/post/  
------post.js  
------post.spec.js  
----/user/  
------/auth/  
--------googleAuth.js  
--------googleAuth.spec.js  
--------localAuth.js  
--------localAuth.spec.js  
------user.js  
------user.spec.js  
--index.js  
--index.spec.js  

**Example file: post.js**  
```
module.exports = (function (){
  function Post(){
  }
  
  Post.prototype.sayHello = function (){
    return 'Log entry'
  }
  return Post
})()
```

**Example file: post.spec.js**
```
'use strict'
var assert = require('assert');
var Post = require('./post')
describe('Post constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var post = new Post();
      assert.equal( 'Log entry', post.sayHello());
    })
  })
})
```

**Example file: googleAuth.js**
```
module.exports = (function (){
  function googleAuth(){
    return 'Log entry'
  }
  
  return googleAuth
})()
```




