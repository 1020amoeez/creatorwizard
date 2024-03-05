import CreaterAbi from '@/utils/CreaterAbi.json';
import MarketAbi from '@/utils/MarketAbi.json';


const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    // console.log('_web3',_web3);
    return new _web3.eth.Contract(abi, address)
}

export const getCreatersContract = (address, web3) => {
    return getContract(CreaterAbi, address, web3)
}
export const getMarketContract = (address, web3) => {
    return getContract(MarketAbi, address, web3)
}