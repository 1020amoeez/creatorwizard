// Set of helper functions to facilitate wallet setup

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
// export const setupNetwork = async (chainChain) => {
//   console.log("chainchain", typeof chainChain, chainChain);
//   const provider = (window).ethereum
//   if (provider) {
//     const chainId = parseInt(chainChain, 10)
//     try {
//       await provider.request({
//         method: 'wallet_switchEthereumChain',
//         params: [
//           {
//             chainId: `0x${chainId.toString(16)}`,
//           },
//         ],
//       })
//       return true
//     } catch (error) {
//       if (error.code === 4902) {
//         if (chainChain === '1') {
//           console.log('eeeeeee');
//           try {
//             await provider.request({
//               method: 'wallet_addEthereumChain',
//               params: [{
//                 chainId: '0x1',
//                 chainName: "Ethereum Mainnet",
//                 nativeCurrency: {
//                   name: "Ethereum Mainnet",
//                   symbol: "ETH",
//                   decimals: 18,
//                 },
//                 rpcUrls: ["https://mainnet.infura.io/v3/"],
//                 blockExplorerUrls: ["https://etherscan.io"],
//                 iconUrls: [""],
//               }],
//             });
//             return true
//           } catch (addError) {
//             console.log('Did not add network');
//           }
//         } else if (chainChain === '56') {
//           try {
//             await provider.request({
//               method: 'wallet_addEthereumChain',
//               params: [{
//                 chainId: '0x38',
//                 chainName: "BNB Smart Chain Mainnet",
//                 nativeCurrency: {
//                   name: "BSC test net",
//                   symbol: "BNB",
//                   decimals: 18,
//                 },
//                 rpcUrls: ['https://bsc-dataseed1.binance.org/'],
//                 blockExplorerUrls: ["https://bscscan.com"],
//                 iconUrls: [""],
//               }],
//             });
//             return true
//           } catch (addError) {
//             console.log('Did not add network');
//           }
//         }
//       }
//     }
//   } else {
//     console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
//     return false
//   }
// }

export const setupNetwork = async (chainId) => {
  const provider = window.ethereum;

  if (provider) {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't set up the network on MetaMask because window.ethereum is undefined"
    );
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage
) => {
  const tokenAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });

  return tokenAdded;
};
