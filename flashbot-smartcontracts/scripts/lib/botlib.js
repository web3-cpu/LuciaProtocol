const settings = require('../configs/settings.json');
const config = require("." + settings.config_path);

const utils = require("./utils");

function getTokenAddresesFromLoanPools() {
    const loanPoolTokenAddresses = new Set();
    for (const pool of config.loanPools) {
        for (const pair of pool.pair) {
            loanPoolTokenAddresses.add(pair.address.toLowerCase());
        }
    }

    const result = [...loanPoolTokenAddresses];
    return result;
}

function getAddressesFromTokens() {
    const addresses = config.tokens.map(token => token.address.toLowerCase());
    return addresses;
}

function getValidTokenPermutations() {
    // Extract loan pool addresses
    const tokenAddressesFromPool = getTokenAddresesFromLoanPools();
    // Get token addresses from Tokens
    const tokenAddressesFromTokens = getAddressesFromTokens();
    // Generate permutations of token addresses
    const tokenPermutations = utils.generatePermutations(tokenAddressesFromTokens, config.cycle);

    // Filter permutations
    const validPermutations = tokenPermutations.filter(permutation =>
        tokenAddressesFromPool.includes(permutation[0])
    );

    return validPermutations;
}

function getValidProtocolCombinations() {
    // Extract router addresses from the protocols
    const protocolRouterAddresses = config.protocols.map(protocol => protocol.router.toLowerCase());

    // Generate combinations of these router addresses
    const routerCombinations = utils.generateCombinationsWithDuplicates(protocolRouterAddresses, config.cycle);

    // Filter combinations
    // const validCombinations = routerCombinations.filter(combination => 
    //     protocolRouterAddresses.includes(combination[0])
    // );

    return routerCombinations;
}

function getProtocolNames(addresses) {
    const protocols = config.protocols;
    const names = [];

    addresses.forEach(address => {
        const protocol = protocols.find(t => t.router.toLowerCase() == address.toLowerCase());
        if (protocol)
            names.push(`${protocol.name} ${protocol.version}`);
        else
            names.push("NaN");
    });

    return names;
}

const getTokenNames = (addresses) => {
    const tokens = config.tokens;
    const names = [];

    addresses.forEach(address => {
        const token = tokens.find(t => t.address.toLowerCase() == address.toLowerCase());
        if (token)
            names.push(token.sym);
        else
            names.push("NaN");
    });

    return names;
}

module.exports = {
    getTokenNames,
    getProtocolNames,
    getValidProtocolCombinations,
    getValidTokenPermutations
};
