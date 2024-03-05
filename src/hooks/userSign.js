// import { useEffect, useCallback, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { connectorsByName, getLibraryForSign } from "../utils/web3React";
// import { ethers } from "ethers";
// import useWeb3 from "./useWeb3";

// const Signature = (data) => {
//   const { account } = useWeb3React();
//   const web3 = useWeb3();
//   let library = null;

//   const ConnectorNames = {
//     Injected: "injected",
//     WalletConnect: "walletconnect",
//     BSC: "bsc"
//   }
//   useEffect(() => {
//     const fetchData = async () => {
//       const connectorId = window.localStorage.getItem("connectorId");
//       if (connectorId && connectorId === ConnectorNames.Injected && account) {
//         library = getLibraryForSign(web3?.givenProvider);
//       } else {
//         if (connectorsByName.walletconnect.provider) {
//           library = getLibraryForSign(connectorsByName.walletconnect.provider);
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   const sign = useCallback(async () => {
//     try {
//       console.log("Attempting", account);
//       console.log("connectorId", ConnectorNames.Injected);
//       if (library && account) {
//         let signature;
//         console.log("Signing");
//         signature = await library.send(
//           'personal_sign',
//           [ethers.utils.hexlify(ethers.utils.toUtf8Bytes(account.toLowerCase())), account.toLowerCase()]
//         );
//         console.log("obtained", signature);
//         return signature;
//       }
//     } catch (error) {
//       console.error("Error", error);
//       throw error;
//     }
//   }, [account, library]);

//   return { userSign: sign };
// };

// export default Signature;

// yesterday


import { useCallback, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { getLibraryForSign } from "../utils/web3React";
import useLibrary from "./useLibrary";
import { ethers } from "ethers";

const useSignature = () => {
  const { account } = useWeb3React();
  const { library, connectorId } = useLibrary();

  const sign = useCallback(
    async () => {
      console.log("Ssoos", useLibrary)
      // console.log("oooow", library)
      if (library && account) {
        try {
          let signature = await library.send("personal_sign", [
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes(account.toLowerCase())),
            account.toLowerCase(),
          ]);
          return signature;
        } catch (error) {
          console.log("!!!!!!!!xx", error)
          throw error;
        }
      }
    },
    [account, library]
  );

  return { userSign: sign };
};

export default useSignature;




// today
// import { useWeb3React } from "@web3-react/core";
// import { useCallback, useEffect } from "react";
// // import Web3 from "web3";
// import { getLibraryForSign } from "../utils/web3React";
// import 'react-toastify/dist/ReactToastify.css';
// import useWeb3 from "../hooks/useWeb3";
// import { connectorsByName } from "../utils/web3React";

// import { ethers } from "ethers";
// export const Signature = (data) => {
//   // let account = data;
//   const { account } = useWeb3React()
//   console.log(account);
//   // const { account } = useWeb3React()
//   const web3 = useWeb3()
//   console.log(web3);
//   var library = null;
//   const connectorId = window.localStorage.getItem("connectorId")
//   console.log(connectorId);
//   if (connectorId === 'injected' && account) {
//     console.log(web3?.givenProvider);
//     library = getLibraryForSign(web3?.givenProvider);
//   } else {
//     if (connectorsByName.walletconnect.provider) {
//       library = getLibraryForSign(connectorsByName.walletconnect.provider);
//     }
//   }
//   const sign = useCallback(async (accountData) => {
//     if ((library && account)) {
//       try {
//         if (account) {
//           const connectorId = window.localStorage.getItem("connectorId")
//           if (connectorId === 'injected') {
//             library = getLibraryForSign(web3?.givenProvider);
//           } else {
//             library = getLibraryForSign(connectorsByName.walletconnect.provider);
//           }
//           let signature = await library.send(
//             'personal_sign',
//             [ethers.utils.hexlify(ethers.utils.toUtf8Bytes((account?.toLowerCase()))), account.toLowerCase()]
//           );
//           return signature
//         }
//       }
//       catch (error) {
//         throw error
//       }
//     }
//   }, [account, library, data, web3])
//   return { userSign: sign }
// }
// export default Signature