module.exports = (function (){
    var dashdash = require('dashdash');
    var _ = require('underscore');    
    function Parser(){
        this.mutuallyExclusiveKeys = ['class','function','object']
        this.options = [{
                // `names` or a single `name`. First element is the `parseResults.KEY`.
                names: ['help', 'h'],
                // See "Option specs" below for types.
                type: 'bool',
                help: 'Print this help and exit.'
            },{
                names: [this.mutuallyExclusiveKeys[0],'c'],
                type: 'bool',
                help: 'Used for creating object oriented classes using ES5 notation. Capitalized function name.'
            },{
                names: [this.mutuallyExclusiveKeys[1],'f'],
                type: 'bool',
                help: 'Used to create standalone function modules, plain old js function. Lowercase function name.'
            },{
                names: [this.mutuallyExclusiveKeys[2],'pojo','o'],
                type: 'bool',
                help: 'Used to define object literals, used if you dont have behaviour associated with an object (i.e. if the object is just a container for data/state).'
            },{
                names: ['chai'],
                type: 'bool',
                help: 'Using Chai test runner, will verify with chai.expect'
            }
        ];

    }

    Parser.prototype.parse = function () {
        this.parseResults = dashdash.parse({options: this.options});
        return this
    }

    Parser.prototype.validate = function (){
        var self = this;
        var res = _.chain(this.parseResults._order)
            .filter(function (item){
                return _.contains(self.mutuallyExclusiveKeys,item.key)
            })
            .value()
        if (res.length > 1){
            console.warn('WARNING: Options for function type --function[-f] --object[-o] --class[-c] are mutually exclusive. Specify only one.');
            console.warn('Defaulting to: --'+res[0].key)
            for (var i = 1; i < res.length; i++){
                self.parseResults[res[i].key] = false
            }
            this.parseResults._order = this.parseResults._order.splice(0,1)
        }else {
            return
        }
    }
    /*
    { function: true,
      object: true,
      class: true,
      _order: 
       [ { key: 'function', value: true, from: 'argv' },
         { key: 'object', value: true, from: 'argv' },
         { key: 'class', value: true, from: 'argv' } ],
      _args: [] }
    */

    return Parser

    
    
})()
