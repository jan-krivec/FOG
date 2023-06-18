import { ethers } from "ethers";
import { useState } from "react";

import contractAddresses from "../chain-info/deployments/map.json";
import boxContractABI from "../chain-info/contracts/Box.json"
import moralisGovernorABI from "../chain-info/contracts/MoralisGovernor.json"
import axios from 'axios';


export function useExecuteProposal() {

    async function rewardForProposal() {
        // provider and signer should be set up correctly to connect to the Ethereum network and sign transactions
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();  // Request user's MetaMask
        let signer = provider.getSigner();

        // The contract ABI and deployed address
        const contractABI = contractAddresses["5"]["Box"][0]; // Contract ABI
        const contractAddress = contractAddresses["5"]["MoralisGovernor"][0];

        // Create a new contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the rewardForProposal function
        const recipient = "0xYourRecipientAddress";
        const amount = ethers.utils.parseUnits("10", 18);  // Change 10 to the number of tokens you want to mint

        const tx = await contract.rewardForProposal(recipient, amount);
        console.log("Transaction sent:", tx.hash);

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt.transactionHash);
    }


    async function queueProposal(signer,value) {
        try {
            console.log(Number(value));
            const boxContract = contractAddresses["5"]["Box"][0];
            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];
            const boxAbi = boxContractABI.abi;
            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);
            const boxInterface = new ethers.utils.Interface(boxAbi);
            const encodedFunction = boxInterface.encodeFunctionData('store', [Number(value)]);
            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Test"))
            const queueTx = await moralisGovernorContractInstance.queue([boxContract], [0], [encodedFunction], descriptionHash, { gasLimit: 1000000 })
            const proposeReceipt = await queueTx.wait(3)
        } catch (err) {
            console.log(err)
        }

    }

    async function executeProposal(signer, value, role) {
        try {
            const boxContract = contractAddresses["5"]["Box"][0];
            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];
            const boxAbi = boxContractABI.abi;
            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);
            const boxInterface = new ethers.utils.Interface(boxAbi);
            const encodedFunction = boxInterface.encodeFunctionData('store', [Number(value)]);
            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Test"));
            const executeTx = await moralisGovernorContractInstance.execute([boxContract], [0], [encodedFunction], descriptionHash, { gasLimit: 1000000 })
            const proposeReceipt = await executeTx.wait(3)

            try {
                const response = await axios.post('http://localhost:8000/update_wallet/', {
                    wallet_id: signer._address,
                    role: role,
                });
                console.log(response.data);
            } catch (error) {
                console.error('Failed to update wallet:', error);
            }
    

        } catch (err) {
            console.log(err)
        }

    }

    return { queueProposal, executeProposal }

}