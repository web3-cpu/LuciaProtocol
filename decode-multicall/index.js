const { lookupNameAndSymbol } = require('./getNameAndSymbol.js')


const fn = async() => {
  const polygonTokenAddresses = [
  	'0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
	  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 
	  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // proxy -> PoSTether
	  '0x01d35cbC2070a3B76693Ce2b6364Eae24eb88591', //proxy->Polygen
	  '0x6f7C932e7684666C9fd1d44527765433e01fF61d', // MKRProxy->MKR
	  '0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE',
	  '0x57Bf52595F7A144c1A170a27f88EC3BFA7fF2FA1'
	  // '0x6fb54Ffe60386aC33b722be13d2549dd87BF63AF', // proxy->Polinate

	  
	];
	let nameAndSymbolList = [];
  for (let address of polygonTokenAddresses) {
	  let data = await lookupNameAndSymbol('POLYGON',address);
	  nameAndSymbolList.push(data);
	}
	console.log("nameAndSymbolList: ",nameAndSymbolList);
  return;
}

fn()

