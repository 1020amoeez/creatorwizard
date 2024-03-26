import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

// import { MAINNET_CHAINS } from '../chains'

// const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number)

// console.log("mainnet", mainnet)
// console.log("optionalChains", optionalChains)

export const [walletConnectV2, hooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "14808831369ecdaaab7b8869eb13c6b0",
        chains: [1115],
        optionalChains: [1115],
        showQrModal: true,
      },

      onError: (err) => {
        console.log("erron in connector::::", err);
      },
    })
);
