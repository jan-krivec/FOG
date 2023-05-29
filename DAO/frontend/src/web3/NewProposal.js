import { ethers } from "ethers";
import { useState } from "react";
import * as React from 'react';

import contractAddresses from "../chain-info/deployments/map.json";
import boxContractABI from "../chain-info/contracts/Box.json"
import moralisGovernorABI from "../chain-info/contracts/MoralisGovernor.json"
import axios from "axios";


export function useCreateProposal() {

    const [proposal, setProposal] = useState();
    const [proposalDescription, setProposalDescription] = useState("Test");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalContent, setModalContent] = useState();
    const [isLoading, setIsLoading] = useState(false); // added isLoading state

    async function createProposal(signer, role) {
        setIsLoading(true); 
        try {
            const boxContract = contractAddresses["5"]["Box"][0];
            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];
            const boxAbi = boxContractABI.abi;
            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer)
            const boxInterface = new ethers.utils.Interface(boxAbi);
            const value = Math.floor(new Date().getTime() / role);
            const encodedFunction = boxInterface.encodeFunctionData('store', [value]);
            setProposalDescription("Test");
            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Test"))
            console.log(proposalDescription, descriptionHash);
            const proposeTx = await moralisGovernorContractInstance.propose([boxContract], [0], [encodedFunction], proposalDescription, { gasLimit: 1000000 })
            const proposeReceipt = await proposeTx.wait(3)
            const proposalId = proposeReceipt.events[0].args.proposalId
            const bnValue = ethers.BigNumber.from(proposalId);

            try {
                const response = await axios.post('http://localhost:8000/proposals/', {
                    proposalId: bnValue.toString(),
                    address: signer._address,
                    role: role,
                    value:value
                });
                console.log(response.data);  // print the response data to the console
            } catch (error) {

                console.error(error);
            }
            setProposal(bnValue.toString());

        } catch (err) {
            setModalContent(`Error creating proposal: ${err.message}`);
            handleOpen();
            console.log(err);
            console.log()
        } finally {
            setIsLoading(false); // end loading after the proposal creation process, whether it's successful or fails
        }

    }

    return { createProposal, proposal, proposalDescription, open, handleOpen, handleClose, modalContent, isLoading };


}