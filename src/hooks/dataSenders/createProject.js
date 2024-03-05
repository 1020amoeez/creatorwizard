import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getCreatersContract } from "../../utils/contractHelpers";
import CreaterAddress from "@/utils/ContractEnvironment";
import ContractEnvironment from '@/utils/ContractEnvironment'


export const getProject = () => {
    const web3 = useWeb3();
    const stakingAddress = ContractEnvironment.CreaterAddress;
    const contract = getCreatersContract(stakingAddress, web3);
    console.log(contract, "moizrfrfrgzzzz");
    const { account } = useWeb3React()
    const Project = useCallback(
        async () => {
            try {
                const gas = await contract.methods
                    .createProject()
                    .estimateGas({ from: account })
                const staked = await contract.methods
                    .createProject()
                    .send({ from: account, gas: gas })
                    .on("transactionHash", (tx) => {
                        return tx.transactionHash;
                    })
                    .catch((error) => {
                        throw error;
                    });
                return staked;
            } catch (e) {
                throw e;
            }
        },
        [contract]
    );

    return { Project: Project };
};

export default getProject;