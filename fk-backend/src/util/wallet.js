import * as wagmiChains from "wagmi/chains";

export const getNetworkName = (chainId) => {
  const allChains = Object.values(wagmiChains);

  const foundChain = allChains.find((chain) => chain.id == chainId);

  if (foundChain) {
    return foundChain.name;
  } else {
    return "empty";
  }
};
