module.exports = (function (){
	function BlockTemplate(options) {
		this.name = options.name;
		this.keyOrder = options.keyOrder || [];
		this.whitelist = this.keyOrder.reduce((whitelist,key,i) => Object.assign(whitelist,{[key]:1}),{})
		this.block = {
			[this.name]: {}
		}
		this.build(options); 
	}
	BlockTemplate.prototype.set = function(key,value) {
		this.block[this.name][key] = value;
	}

	BlockTemplate.prototype.getLines = function (keyOrder) {
		var keys = keyOrder || Object.keys(this.block[this.name]);
		var results = keys.map(k => '  ' + k + ' ' + this.block[this.name][k] + ';');
		return results
	}

	BlockTemplate.prototype.getKeys = function () {
		return this.keyOrder;
	}

	BlockTemplate.prototype.build = function (options) {
		if (!options || !this.whitelist) {
			return;
		}
		Object.keys(options).filter(key => this.whitelist[key])
			.reduce((block,key) => Object.assign(this.block[this.name],{[key]: options[key]}),this.block)
	}


	BlockTemplate.prototype.wrapWithBraces = function(lines) {
		var linesCopy = lines ? lines.slice() : this.getLines().slice();
		linesCopy.unshift(Object.keys(this.block)[0] + ' {');
		linesCopy.push('}');
		return linesCopy;
	}

	return BlockTemplate;
})()
